import { Test, TestingModule } from '@nestjs/testing';
import { MatricA1cController } from './matric-a1c.controller';
import { MatricA1cService } from './matric-a1c.service';

describe('MatricA1cController', () => {
  let controller: MatricA1cController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatricA1cController],
      providers: [MatricA1cService],
    }).compile();

    controller = module.get<MatricA1cController>(MatricA1cController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
