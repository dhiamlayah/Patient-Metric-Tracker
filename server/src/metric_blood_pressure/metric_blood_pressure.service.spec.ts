import { Test, TestingModule } from '@nestjs/testing';
import { MetricBloodPressureService } from './metric_blood_pressure.service';

describe('MetricBloodPressureService', () => {
  let service: MetricBloodPressureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricBloodPressureService],
    }).compile();

    service = module.get<MetricBloodPressureService>(MetricBloodPressureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
