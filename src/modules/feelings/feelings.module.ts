import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from '../movies/movies.module';
import { Feeling } from './feeling.entity';
import { FeelingsController } from './feelings.controller';
import { FeelingsService } from './feelings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feeling]),
    MoviesModule
  ],
  providers: [FeelingsService],
  exports: [FeelingsService],
  controllers: [FeelingsController]
})
export class FeelingsModule { }
