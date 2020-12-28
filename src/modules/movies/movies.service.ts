import { ConflictException, HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { URL } from 'url';
import { MovieSearchParams } from './models/movie-search-params.model';
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
    url.search = new MovieSearchParams(params).toString();
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

  async create(createMovie: unknown): Promise<Movie> {
    const movie = new Movie(createMovie);
    return this.movieRepository.save(movie).catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(err.message);
      } else {
        throw new InternalServerErrorException('unhandled exception: ' + err)
      }
    });
  }

  async findOne(id: number) {
    return this.movieRepository.findOne(id);
  }
}
