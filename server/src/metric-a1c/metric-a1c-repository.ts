import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MetricA1c } from './entities/metric-a1c.entity';
import { CreateMetricA1cDto } from './dto/create-metric-a1c.dto';

@Injectable()
export class MetricA1cRepository extends Repository<MetricA1c> {
  constructor(private dataSource: DataSource) {
    super(MetricA1c, dataSource.createEntityManager());
  }

  async getAvrageByMonths(patientId: number) {
    const queryBuilder = await this.createQueryBuilder('ma');
    return queryBuilder
      .select('RIGHT(EXTRACT(YEAR FROM ma.recorded_at)::TEXT, 2)', 'year')
      .addSelect('EXTRACT(MONTH FROM ma.recorded_at)', 'month')
      .addSelect('ROUND(AVG(ma.value), 2)', 'average_value')
      .where('ma.patient_id = :patientId', { patientId })
      .groupBy('EXTRACT(YEAR FROM ma.recorded_at)')
      .addGroupBy('EXTRACT(MONTH FROM ma.recorded_at)')
      .orderBy('year', 'ASC')
      .addOrderBy('month', 'ASC')
      .getRawMany();
  }

  async createMany(rows: CreateMetricA1cDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try{
      await queryRunner.manager.insert(MetricA1c, rows);
      await queryRunner.commitTransaction();
      return { success: true, message: 'Records successfully inserted' };
      }catch(error:any){
      await queryRunner.rollbackTransaction();
      return { success: false, message: `error from inserting rows in metric_A1C :${error.message}`};
    }finally{
      await queryRunner.release()
    }
  }
}
