import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { URL } from 'url';
import { TmdbMovieSearchParams } from './models/movie-search-params.model';
import { TmdbMovieModel } from './models/tmdb-movie.model';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private httpService: HttpService
  ) { }

  async search(params: any): Promise<Movie[]> {
    const url = new URL(`${process.env.TMDB_API_URL}search/movie`)
    url.search = new TmdbMovieSearchParams(params).toString();
    const searchResult = await this.httpService.get(url.toString()).toPromise().catch(err => {
      throw err;
    });
    const tmdbMovies: TmdbMovieModel[] = searchResult.data.results
    const movies: Movie[] = [];

    for (let tmdbMovie of tmdbMovies) {
      let returnMovie: Movie;
      const tmdbMovieToMovie = new TmdbMovieModel(tmdbMovie).toMovie();
      const movie = await this.movieRepository.findOne(tmdbMovie.id);
      if (movie) {
        const mergedMovie = Object.assign({}, movie, tmdbMovieToMovie);
        returnMovie = new Movie(mergedMovie);
      } else {
        returnMovie = tmdbMovieToMovie;
      }
      movies.push(returnMovie);
    }

    return new Promise((resolve) => { resolve(movies) });
  }

  async searchByFeelings(feelingTypeIds: number[]): Promise<Movie[]> {
    let movies = await this.movieRepository.find({
      join: {
        alias: "movies",
        leftJoin: {
          feelings: "movies.feelings",
          feelingType: "feelings.feelingType"
        }
      },
      where: qb => {
        for (let feelingTypeId of feelingTypeIds) {
          qb.andWhere('feelingType.id = :id', { id: feelingTypeId })
        }
      }
    })

    // orders movies by amount of feelings matching feelingTypeIds (descending)
    movies.sort((a, b) => {
      return b.calculateFeelingsAmountByFeelingTypeIds(feelingTypeIds) - a.calculateFeelingsAmountByFeelingTypeIds(feelingTypeIds)
    })

    return movies
  }

  async create(createMovie: unknown): Promise<Movie> {
    const movie = new Movie(createMovie);
    return this.movieRepository.save(movie);
  }

  async findOne(id: number) {
    return this.movieRepository.findOne(id);
  }
}
