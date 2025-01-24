import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(@InjectRepository(Patient) private repo:Repository<Patient>){}

  create(createPatientDto: CreatePatientDto) {
    try{
      const user = this.repo.create(createPatientDto)
      return this.repo.save(user)
    }catch(err:any){
      console.log(`error from creation ${err.message}`)
      throw new InternalServerErrorException('Error creating patient')
    }

  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
