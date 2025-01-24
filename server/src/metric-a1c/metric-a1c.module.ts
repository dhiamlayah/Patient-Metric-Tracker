import { Module } from '@nestjs/common';
import { MetricA1cService } from './metric-a1c.service';
import { MetricA1cController } from './metric-a1c.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricA1c } from './entities/metric-a1c.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MetricA1c])],
  controllers: [MetricA1cController],
  providers: [MetricA1cService],
})
export class MetricA1cModule {}
