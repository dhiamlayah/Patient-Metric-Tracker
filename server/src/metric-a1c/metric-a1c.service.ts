import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMetricA1cDto } from './dto/create-metric-a1c.dto';
import { MetricA1cRepository } from './metric-a1c-repository';

@Injectable()
export class MetricA1cService {
  constructor(private repo: MetricA1cRepository) {}

  create(createMetricA1cDto: CreateMetricA1cDto) {
    try {
      const metricA1c = this.repo.create(createMetricA1cDto);
      return this.repo.save(metricA1c);
    } catch (err: any) {
      throw new InternalServerErrorException('Error creating metric-a1c');
    }
  }

  async findOne(id: number,skip:number = 0) {
    const metricA1c = await this.repo.findAndCount({
      select: ['id', 'value', 'recorded_at'],
      where: { patient_id: id },
      order: { recorded_at: 'DESC' },
      skip:skip,
      take:10
    });
    if (!metricA1c) {
      throw new NotFoundException('metric a1c Not Found, check patient exist');
    }
    return metricA1c;
  }

  async getAvrageByMonths(id:number){
    const averageMetricA1c = await this.repo.getAvrageByMonths(id)
    if (!averageMetricA1c) {
      throw new NotFoundException('Cant Calculate Metric A1C Average ');
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
