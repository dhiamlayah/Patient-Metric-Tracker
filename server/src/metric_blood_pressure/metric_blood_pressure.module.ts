import { Module } from '@nestjs/common';
import { MetricBloodPressureService } from './metric_blood_pressure.service';
import { MetricBloodPressureController } from './metric_blood_pressure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricBloodPressure } from './entities/metric_blood_pressure.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MetricBloodPressure])],
  controllers: [MetricBloodPressureController],
  providers: [MetricBloodPressureService],
})
export class MetricBloodPressureModule {}
