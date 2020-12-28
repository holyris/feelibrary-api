import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    HttpModule
  ],
  providers: [MoviesService],
  exports: [MoviesService],
  controllers: [MoviesController]

})
export class MoviesModule { }
