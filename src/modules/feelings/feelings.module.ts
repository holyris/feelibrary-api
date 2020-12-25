import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feeling } from './feeling.entity';
import { FeelingsService } from './feelings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Feeling])],
  providers: [FeelingsService]
})
export class FeelingsModule {}
