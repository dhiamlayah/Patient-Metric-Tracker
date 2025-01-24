import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMatricA1cDto } from './dto/create-matric-a1c.dto';
import { UpdateMatricA1cDto } from './dto/update-matric-a1c.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MatricA1c } from './entities/matric-a1c.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatricA1cService {
  constructor(
    @InjectRepository(MatricA1c) private repo: Repository<MatricA1c>,
  ) {}

  create(createMatricA1cDto: CreateMatricA1cDto) {
    try {
      const matricA1c = this.repo.create(createMatricA1cDto);
      return this.repo.save(matricA1c);
    } catch (err: any) {
      console.error(`error in creation matric-a1c ${err.message}`);
      throw new InternalServerErrorException('Error creating matric-a1c')
    }
  }

  findAll() {
    return `This action returns all matricA1c`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matricA1c`;
  }

  update(id: number, updateMatricA1cDto: UpdateMatricA1cDto) {
    return `This action updates a #${id} matricA1c`;
  }

  remove(id: number) {
    return `This action removes a #${id} matricA1c`;
  }
}
