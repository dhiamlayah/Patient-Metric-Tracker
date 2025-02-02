import { Module } from '@nestjs/common';
import { CsvProcessingService } from './csv-processing.service';
import { CsvProcessingController } from './csv-processing.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CsvProcessingWorker } from './csv-processing.worker';
import { MetricA1cModule } from 'src/metric-a1c/metric-a1c.module';
import { MetricBloodPressureModule } from 'src/metric_blood_pressure/metric_blood_pressure.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'csvProcessingQueue',
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    MetricA1cModule,
    MetricBloodPressureModule,
  ],
  providers: [CsvProcessingService,CsvProcessingWorker],
  controllers: [CsvProcessingController],
})
export class CsvProcessingModule {}
