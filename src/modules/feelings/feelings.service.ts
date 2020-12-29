import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from '../movies/movies.service';
import { CreateFeelingDto } from './dto/create-feeling.dto';
import { Feeling } from './feeling.entity';

@Injectable()
export class FeelingsService {
  constructor(
    @InjectRepository(Feeling)
    private feelingRepository: Repository<Feeling>,
    private moviesService: MoviesService
  ) { }

  async create(createFeeling: CreateFeelingDto): Promise<Feeling> {
    const feeling = new Feeling(createFeeling);
    if (feeling.movie) {
      const movie = await this.moviesService.findOne(feeling.movie.id)
      if (!movie) {
        await this.moviesService.create(feeling.movie);
      }
    }
    return this.feelingRepository.save(feeling)
  }
}
