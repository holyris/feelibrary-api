import { Module } from '@nestjs/common';
import { FeelingsService } from './feelings.service';

@Module({
  providers: [FeelingsService]
})
export class FeelingsModule {}
