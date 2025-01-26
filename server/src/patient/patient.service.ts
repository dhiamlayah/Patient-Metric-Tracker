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
      console.log(`error from creation ${err.message}`);
      throw new InternalServerErrorException('Error creating patient');
    }
  }

  async findAll(startFrom?:number) {
   try{
    const patients = await this.repo.getPatientsWithMetrics(startFrom)
    return patients
   }catch(err:any){
    throw new InternalServerErrorException('Error getting patients');
   }
  }

  async findOne(id: number) {
      const patient = await this.repo.getSinglePatientWithMetrics(id)
      if(!patient){
        throw new NotFoundException('Patient Not Found')}
      return patient
     
   }

  // update(id: number, updatePatientDto: UpdatePatientDto) {
  //   return `This action updates a #${id} patient`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} patient`;
  // }
}
