import { Movie } from "../movie.entity";

export class TmdbMovieModel {
  id: number;
  imdb_id: string;
  title: string;
  original_title: string;
  original_language: string;
  overview: string;
  status: number;
  release_date: Date;
  poster_path: string;
  budget: number;
  revenue: number;


  constructor(partial: Partial<TmdbMovieModel>) {
    Object.assign(this, partial);
  }

  toMovie(): Movie {
    const obj = {
      id: this.id,
      title: this.title,
      description: this.overview || null,
      releaseDate: this.release_date || null,
      image: this.poster_path || null
    }

    return new Movie(obj);
  }
}