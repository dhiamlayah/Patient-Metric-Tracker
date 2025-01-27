import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMetricA1cDto } from './dto/create-metric-a1c.dto';
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
    const metricA1c = await this.repo.find({ select:['id','value','recorded_at'],where:{patient_id: id},order:{recorded_at:"asc"} });
    if (!metricA1c) {
      throw new NotFoundException('metric a1c Not Found, check patient exist');
    }
    return metricA1c;
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
