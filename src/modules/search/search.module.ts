import { Module } from '@nestjs/common';
import { MoviesModule } from '../movies/movies.module';
import { SearchController } from './search.controller';

@Module({
  imports: [MoviesModule],
  controllers: [SearchController],
})
export class SearchModule {}
