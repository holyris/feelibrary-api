import { BadRequestException, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Public } from '../auth/constants';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

  constructor(
    private readonly moviesService: MoviesService
  ) { }
}
