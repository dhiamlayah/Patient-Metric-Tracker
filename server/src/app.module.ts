import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricA1cModule } from './metric-a1c/metric-a1c.module';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient/entities/patient.entity';
import { MetricA1c } from './metric-a1c/entities/metric-a1c.entity';
import { MetricBloodPressureModule } from './metric_blood_pressure/metric_blood_pressure.module';
import { MetricBloodPressure } from './metric_blood_pressure/entities/metric_blood_pressure.entity';
import { ConfigModule } from '@nestjs/config';
import { CsvProcessingModule } from './csv-processing/csv-processing.module';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from './config/database.module';
import { RedisModule } from './config/redis.module';
import envConfig from './config/env.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [envConfig],
    }),
    MetricA1cModule,
    PatientModule,
    MetricBloodPressureModule,
    RedisModule,
    DatabaseModule,
    CsvProcessingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
