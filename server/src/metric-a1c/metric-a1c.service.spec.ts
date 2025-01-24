import { Test, TestingModule } from '@nestjs/testing';
import { MetricA1cService } from './metric-a1c.service';

describe('MetricA1cService', () => {
  let service: MetricA1cService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricA1cService],
    }).compile();

    service = module.get<MetricA1cService>(MetricA1cService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
