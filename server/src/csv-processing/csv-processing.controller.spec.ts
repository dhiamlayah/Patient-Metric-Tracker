import { Test, TestingModule } from '@nestjs/testing';
import { CsvProcessingController } from './csv-processing.controller';

describe('CsvProcessingController', () => {
  let controller: CsvProcessingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvProcessingController],
    }).compile();

    controller = module.get<CsvProcessingController>(CsvProcessingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
