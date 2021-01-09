import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoviesService } from '../movies/movies.service';
import { CreateFeelingDto } from './dto/create-feeling.dto';
import { DeleteFeelingDto } from './dto/delete-feeling.dto';
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
      const userMovieFeelingsCount = await this.feelingRepository.find(
        {
          where:
          {
            user: { id: createFeeling.user.id },
            movie: { id: createFeeling.movie.id }
          }
        });

      if (userMovieFeelingsCount.length < Number(process.env.MOVIE_FEELINGS_LIMIT)) {
        const movie = await this.moviesService.findOne(feeling.movie.id)
        if (!movie) {
          await this.moviesService.create(feeling.movie);
        }
        return this.feelingRepository.save(feeling)
      } else {
        throw new BadRequestException(`Cannot have more than ${process.env.MOVIE_FEELINGS_LIMIT} feelings for a movie`)
      }
    }
  }

  async deleteById(id: number): Promise<void> {
    await this.feelingRepository.delete(id);
  }

  async delete(deleteFeeling: DeleteFeelingDto): Promise<void> {
    await this.feelingRepository.delete(
      {
        feelingType: { id: deleteFeeling.feelingTypeId },
        user: { id: deleteFeeling.userId },
        movie: { id: deleteFeeling.movieId },
      })
  }
}
