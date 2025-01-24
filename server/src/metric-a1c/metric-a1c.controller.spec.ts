import { Test, TestingModule } from '@nestjs/testing';
import { MetricA1cController } from './metric-a1c.controller';
import { MetricA1cService } from './metric-a1c.service';

describe('MetricA1cController', () => {
  let controller: MetricA1cController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetricA1cController],
      providers: [MetricA1cService],
    }).compile();

    controller = module.get<MetricA1cController>(MetricA1cController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
