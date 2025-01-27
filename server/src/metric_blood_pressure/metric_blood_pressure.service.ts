import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMetricBloodPressureDto } from './dto/create-metric_blood_pressure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MetricBloodPressure } from './entities/metric_blood_pressure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetricBloodPressureService {
  constructor(
    @InjectRepository(MetricBloodPressure)
    private repo: Repository<MetricBloodPressure>,
  ) {}

  create(createMetricBloodPressureDto: CreateMetricBloodPressureDto) {
    try {
      const metricBloodProcess = this.repo.create(createMetricBloodPressureDto);
      return this.repo.save(metricBloodProcess);
    } catch (err: any) {
      throw new InternalServerErrorException(
        'Error creating metric-blood-pressure',
      );
    }
  }
  
  async findOne(id: number) {
    const metricBloodPressure = await this.repo.find({select:['id','systolic','diastolic','recorded_at'], where:{patient_id: id},order:{recorded_at:"asc"} });
    if (!metricBloodPressure) {
      throw new NotFoundException(
        'metric blood pressure, Not Found check patient exist',
      );
    }
    return metricBloodPressure;
  }

  async remove(id: number , recorded_at:Date ) {
    const metricBloodPressure = await this.repo.findOneBy({patient_id: id,recorded_at:recorded_at});
    if (metricBloodPressure) {
      await this.repo.remove(metricBloodPressure);
      return 'Row Deleted Succussfuly'
    }
    throw new NotFoundException(
      'metric blood pressure, Not Found check patient exist',
    );
  }

}
