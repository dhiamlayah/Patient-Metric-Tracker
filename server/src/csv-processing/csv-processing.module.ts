import { Module } from '@nestjs/common';
import { CsvProcessingService } from './csv-processing.service';
import { CsvProcessingController } from './csv-processing.controller';
import { RedisService } from 'src/config/redis.provider';
import { MulterModule } from '@nestjs/platform-express';
import { CsvProcessingWorker } from './csv-processing.worker';
import { MetricA1cModule } from 'src/metric-a1c/metric-a1c.module';
import { MetricBloodPressureModule } from 'src/metric_blood_pressure/metric_blood_pressure.module';

@Module({
  imports:[
    MetricA1cModule,
    MetricBloodPressureModule,
    MulterModule.register({
      dest: './uploads', 
    })
  ], 
  providers: [CsvProcessingService,RedisService,CsvProcessingWorker],
  controllers: [CsvProcessingController],
})
export class CsvProcessingModule {}
