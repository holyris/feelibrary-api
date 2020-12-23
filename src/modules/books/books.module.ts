import { HttpModule, Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [HttpModule],
  providers: [BooksService],
  controllers: [BooksController]
})
export class BooksModule {}
