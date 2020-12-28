import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeelingType } from './feeling-type.entity';
import { FeelingTypesController } from './feeling-types.controller';
import { FeelingTypesService } from './feeling-types.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeelingType]),
  ],
  providers: [FeelingTypesService],
  controllers: [FeelingTypesController]
})
export class FeelingTypesModule { }
