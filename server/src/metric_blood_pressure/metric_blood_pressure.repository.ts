import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MetricBloodPressure } from './entities/metric_blood_pressure.entity';

@Injectable()
export class MetricBloodPressureRepository extends Repository<MetricBloodPressure> {
  constructor(private dataSource: DataSource) {
    super(MetricBloodPressure, dataSource.createEntityManager());
  }


  async getAvrageByMonths(patientId: number) {
    const queryBuilder = await this.createQueryBuilder('mbp');
    return queryBuilder
      .select('RIGHT(EXTRACT(YEAR FROM mbp.recorded_at)::TEXT, 2)', 'year')   // this extract the last two digits in the year exp : 2021 => 21
      .addSelect('EXTRACT(MONTH FROM mbp.recorded_at)', 'month')
      .addSelect('ROUND(AVG(mbp.diastolic), 2)', 'average_diastolic')
      .addSelect('ROUND(AVG(mbp.systolic), 2)', 'average_systolic')
      .where('mbp.patient_id = :patientId', { patientId })
      .groupBy('EXTRACT(YEAR FROM mbp.recorded_at)')
      .addGroupBy('EXTRACT(MONTH FROM mbp.recorded_at)')
      .orderBy('year', 'DESC')
      .addOrderBy('month', 'DESC')
      .getRawMany();
  }
}
