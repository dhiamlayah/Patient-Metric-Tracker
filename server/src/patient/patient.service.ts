import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(private repo: PatientRepository) {}

  create(createPatientDto: CreatePatientDto) {
    try {
      const user = this.repo.create(createPatientDto);
      return this.repo.save(user);
    } catch (err: any) {
      throw new InternalServerErrorException('Error in creating new  patient');
    }
  }

  async findAll(startFrom?:number) {
    const patients = await this.repo.getPatientsWithMetrics(startFrom)
    if(!patients){
      throw new InternalServerErrorException("Patients Not Found");
    }
    return patients
  }

  async findOne(id: number) {
      const patient = await this.repo.getSinglePatientWithMetrics(id)
      if(!patient){
        throw new NotFoundException('Patient Not Found')}
      return patient
   }
}
