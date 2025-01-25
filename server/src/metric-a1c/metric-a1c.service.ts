import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMetricA1cDto } from './dto/create-metric-a1c.dto';
import { UpdateMetricA1cDto } from './dto/update-metric-a1c.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetricA1c } from './entities/metric-a1c.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetricA1cService {
  constructor(
    @InjectRepository(MetricA1c) private repo: Repository<MetricA1c>,
  ) {}

  create(createMetricA1cDto: CreateMetricA1cDto) {
    try {
      const metricA1c = this.repo.create(createMetricA1cDto);
      return this.repo.save(metricA1c);
    } catch (err: any) {
      console.error(`error in creation metric-a1c ${err.message}`);
      throw new InternalServerErrorException('Error creating metric-a1c');
    }
  }
  
  async findOne(id: number) {
    const metricA1c = await this.repo.find({ where:{patient_id: id},order:{recorded_at:"DESC"} });
    if (!metricA1c) {
      throw new NotFoundException('metric a1c Not Found, check patient exist');
    }
    return metricA1c;
  }

  // update(id: number, updateMetricA1cDto: UpdateMetricA1cDto) {
  //   return `This action updates a #${id} metricA1c`;
  // }

  // findAll() {
  //   return `This action returns all metricA1c`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} metricA1c`;
  // }
}
