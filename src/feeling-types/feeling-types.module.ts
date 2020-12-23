import { Module } from '@nestjs/common';
import { FeelingTypesService } from './feeling-types.service';

@Module({
  providers: [FeelingTypesService]
})
export class FeelingTypesModule {}
