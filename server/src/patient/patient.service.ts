import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
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

  async findAll() {
   try{
    const patients = await this.repo.getPatientsWithMetrics()
    return patients
   }catch(err:any){
    console.log(`error from getting patients : ${err.message}`)
    throw new InternalServerErrorException('Error getting patients');

   }
  }

  async findOne(id: number) {
    try{
      const patients = await this.repo.getSinglePatientWithMetrics(id)
      return patients
     }catch(err:any){
      console.log(`error from getting single patient : ${err.message}`)
      throw new InternalServerErrorException('Error getting signle patient');
  
     }  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
