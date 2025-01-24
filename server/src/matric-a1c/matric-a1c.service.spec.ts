import { Test, TestingModule } from '@nestjs/testing';
import { MatricA1cService } from './matric-a1c.service';

describe('MatricA1cService', () => {
  let service: MatricA1cService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatricA1cService],
    }).compile();

    service = module.get<MatricA1cService>(MatricA1cService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
