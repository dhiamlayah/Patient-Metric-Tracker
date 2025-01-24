import { Module } from '@nestjs/common';
import { MatricA1cService } from './matric-a1c.service';
import { MatricA1cController } from './matric-a1c.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatricA1c } from './entities/matric-a1c.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MatricA1c])],
  controllers: [MatricA1cController],
  providers: [MatricA1cService],
})
export class MatricA1cModule {}
