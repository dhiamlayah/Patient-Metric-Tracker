import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatricA1cModule } from './matric-a1c/matric-a1c.module';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient/entities/patient.entity';
import { MatricA1c } from './matric-a1c/entities/matric-a1c.entity';

@Module({
  imports: [MatricA1cModule,PatientModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '2001',
      username: 'postgres',
      entities: [Patient,MatricA1c],
      database: 'Patient_Metric_Tracker ',
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
