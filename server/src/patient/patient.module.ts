import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { DataSource } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService,PatientRepository ],
})
export class PatientModule {}
