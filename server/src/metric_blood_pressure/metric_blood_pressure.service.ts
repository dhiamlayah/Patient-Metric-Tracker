import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMetricBloodPressureDto } from './dto/create-metric_blood_pressure.dto';
import { MetricBloodPressureRepository } from './metric_blood_pressure.repository';

@Injectable()
export class MetricBloodPressureService {
  constructor( private repo: MetricBloodPressureRepository) {}

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

  async findOne(id: number,skip:number = 0) {
    const metricBloodPressure = await this.repo.findAndCount({
      select: ['id', 'systolic', 'diastolic', 'recorded_at'],
      where: { patient_id: id },
      order: { recorded_at: 'DESC' },
      skip:skip,
      take:10
    });
    if (!metricBloodPressure) {
      throw new NotFoundException(
        'metric blood pressure, Not Found check patient exist',
      );
    }
    return metricBloodPressure;
  }

  async getAvrageByMonths(id:number){
    const averageMetricA1c = await this.repo.getAvrageByMonths(id)
    if (!averageMetricA1c) {
      throw new NotFoundException('Cant Calculate Metric Blood Pressure  Average ');
    }
    return averageMetricA1c
  }

  async remove(id: number, recorded_at: Date) {
    const metricBloodPressure = await this.repo.findOneBy({
      patient_id: id,
      recorded_at: recorded_at,
    });
    if (metricBloodPressure) {
      await this.repo.remove(metricBloodPressure);
      return 'Row Deleted Succussfuly';
    }
    throw new NotFoundException(
      'metric blood pressure, Not Found check patient exist',
    );
  }
}
