import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MetricA1c } from './entities/metric-a1c.entity';

@Injectable()
export class MetricA1cRepository extends Repository<MetricA1c> {
  constructor(private dataSource: DataSource) {
    super(MetricA1c, dataSource.createEntityManager());
  }

  async getAvrageByMonths(patientId: number) {
    const queryBuilder = await this.createQueryBuilder('ma');
    return queryBuilder
      .select('RIGHT(EXTRACT(YEAR FROM ma.recorded_at)::TEXT, 2)', 'year')   // this extract the last two digits in the year exp : 2021 => 21
      .addSelect('EXTRACT(MONTH FROM ma.recorded_at)', 'month')
      .addSelect('ROUND(AVG(ma.value), 2)', 'average_value')
      .where('ma.patient_id = :patientId', { patientId })
      .groupBy('EXTRACT(YEAR FROM ma.recorded_at)')
      .addGroupBy('EXTRACT(MONTH FROM ma.recorded_at)')
      .orderBy('year', 'DESC')
      .addOrderBy('month', 'DESC')
      .getRawMany();
  }
}
