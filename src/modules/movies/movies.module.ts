import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MoviesService],
  exports: [MoviesService]

})
export class MoviesModule { }
