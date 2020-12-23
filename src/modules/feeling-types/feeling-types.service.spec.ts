import { Test, TestingModule } from '@nestjs/testing';
import { FeelingTypesService } from './feeling-types.service';

describe('FeelingTypeService', () => {
  let service: FeelingTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeelingTypesService],
    }).compile();

    service = module.get<FeelingTypesService>(FeelingTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
