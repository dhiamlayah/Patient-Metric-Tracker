import { Module } from '@nestjs/common';
import { MetricBloodPressureService } from './metric_blood_pressure.service';
import { MetricBloodPressureController } from './metric_blood_pressure.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricBloodPressure } from './entities/metric_blood_pressure.entity';
import { MetricBloodPressureRepository } from './metric_blood_pressure.repository';

@Module({
  imports:[TypeOrmModule.forFeature([MetricBloodPressure])],
  controllers: [MetricBloodPressureController],
  providers: [MetricBloodPressureService,MetricBloodPressureRepository],
  exports:[MetricBloodPressureRepository]
})
export class MetricBloodPressureModule { }
