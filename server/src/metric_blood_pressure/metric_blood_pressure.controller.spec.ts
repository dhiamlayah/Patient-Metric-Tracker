import { Test, TestingModule } from '@nestjs/testing';
import { MetricBloodPressureController } from './metric_blood_pressure.controller';
import { MetricBloodPressureService } from './metric_blood_pressure.service';

describe('MetricBloodPressureController', () => {
  let controller: MetricBloodPressureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricBloodPressureController],
      providers: [MetricBloodPressureService],
    }).compile();

    controller = module.get<MetricBloodPressureController>(MetricBloodPressureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
