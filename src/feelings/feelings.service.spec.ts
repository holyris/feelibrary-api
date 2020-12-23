import { Test, TestingModule } from '@nestjs/testing';
import { FeelingsService } from './feelings.service';

describe('FeelingsService', () => {
  let service: FeelingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeelingsService],
    }).compile();

    service = module.get<FeelingsService>(FeelingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
