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
import { RedisService } from './config/redis.provider';
import { CsvProcessingModule } from './csv-processing/csv-processing.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MetricA1cModule,
    PatientModule,
    MetricBloodPressureModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432,
      password:process.env.PG_PASSWORD,
      username:process.env.PG_USER,
      entities: [Patient, MetricA1c,MetricBloodPressure],
      database: process.env.PG_DATABASE,
      synchronize: true,
      logging: false,
    }),
    CsvProcessingModule
  ],
  controllers: [AppController],
  providers: [AppService,RedisService],
})
export class AppModule {}
