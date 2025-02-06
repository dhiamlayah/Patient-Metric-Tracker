import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricA1cModule } from './metric-a1c/metric-a1c.module';
import { PatientModule } from './patient/patient.module';
import { MetricBloodPressureModule } from './metric_blood_pressure/metric_blood_pressure.module';
import { ConfigModule } from '@nestjs/config';
import { CsvProcessingModule } from './csv-processing/csv-processing.module';
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
    CsvProcessingModule,
    RedisModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
