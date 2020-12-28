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

  @Public()
  @Get('search')
  search(
    @Query('query') query: string,
    @Query('page') page: number,
    @Query('language') language: string,
    @Query('year') year: number

  ): Promise<Movie[]> {
    if(!query) throw new BadRequestException("Query 'query' is required");
    return this.moviesService.search({query, page, language, year});
  }
}
