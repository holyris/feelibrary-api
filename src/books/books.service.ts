import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(private httpService: HttpService) { }

  search(query: string): any {
    const transformedQuery = query.replace(/\s+/g, "+");
    const searchResult: any = this.httpService.get('http://openlibrary.org/search.json?q=' + transformedQuery);
    if (searchResult.hasOwnProperty("docs")) {
      const searchResultBooks = searchResult.docs
      for(const book of searchResultBooks){
        
      }
    }
  }
}
