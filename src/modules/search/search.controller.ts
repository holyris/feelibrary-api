import { BadRequestException } from '@nestjs/common';
import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/modules/auth/constants';
import { MoviesService } from 'src/modules/movies/movies.service';

@Public()
@Controller('search')
export class SearchController {

  constructor(
    private readonly moviesService: MoviesService
  ) { }

  @Get('movies')
  searchMovies(
    @Query('title') title: string,
    @Query('feelings') feelings: number[],
    @Query('page') page: number,
    @Query('language') language: string,
    @Query('year') year: number,
  ) {

    if (title) {
      return this.moviesService.search({ query: title, page, language, year });
    } else if (feelings && feelings.length) {
      return this.moviesService.searchByFeelings(feelings)
    } else {
      throw new BadRequestException("Queries 'title' or 'feelings' are required");
    }

  }

}
