import { Test, TestingModule } from '@nestjs/testing';
import { CsvProcessingService } from './csv-processing.service';

describe('CsvProcessingService', () => {
  let service: CsvProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvProcessingService],
    }).compile();

    service = module.get<CsvProcessingService>(CsvProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
