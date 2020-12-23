import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BooksController {

  @Get('search')
  search(query: string){
    
  }
}
