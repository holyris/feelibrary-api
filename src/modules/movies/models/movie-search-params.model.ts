
export class TmdbMovieSearchParams {
  query: string
  page: number
  language: string
  year: number
  api_key: string = process.env.TMDB_API_KEY


  constructor(partial: Partial<TmdbMovieSearchParams>) {
    Object.assign(this, partial);
  }

  toString(): string {
    let returnString: string = '?'
    for (const property in this) {
      if (this[property]) {
        returnString = returnString.concat(`${property}=${this[property]}&`)
      }
    }
    return returnString
  }
}