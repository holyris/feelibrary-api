import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feeling } from './feeling.entity';

@Injectable()
export class FeelingsService {
  constructor(
    @InjectRepository(Feeling)
    private feelingRepository: Repository<Feeling>
  ) { }

  async create(createFeeling: unknown): Promise<Feeling> {
    const feeling = new Feeling(createFeeling);
    return this.feelingRepository.save(feeling).catch(err => {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(err.message);
      } else {
        throw new InternalServerErrorException('unhandled exception: ' + err)
      }
    });
  }
}
