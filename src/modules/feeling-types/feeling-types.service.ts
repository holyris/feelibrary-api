import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeelingType } from './feeling-type.entity';

@Injectable()
export class FeelingTypesService {

  constructor(
    @InjectRepository(FeelingType)
    private feelingTypeRepository: Repository<FeelingType>
  ) { }

  findAll(): Promise<FeelingType[]> {
    return this.feelingTypeRepository.find();
  }
}
