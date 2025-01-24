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

@Module({
  imports: [
    MetricA1cModule,
    PatientModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '2001',
      username: 'postgres',
      entities: [Patient, MetricA1c,MetricBloodPressure],
      database: 'Patient_Metric_Tracker ',
      synchronize: true,
      logging: true,
    }),
    MetricBloodPressureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
