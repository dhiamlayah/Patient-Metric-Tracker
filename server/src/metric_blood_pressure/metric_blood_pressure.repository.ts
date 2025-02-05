import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { MetricBloodPressure } from './entities/metric_blood_pressure.entity';
import { CreateMetricBloodPressureDto } from './dto/create-metric_blood_pressure.dto';

@Injectable()
export class MetricBloodPressureRepository extends Repository<MetricBloodPressure> {
  constructor(private dataSource: DataSource) {
    super(MetricBloodPressure, dataSource.createEntityManager());
  }

  async getAvrageByMonths(patientId: number) {
    const queryBuilder = await this.createQueryBuilder('mbp');
    return queryBuilder
      .select('RIGHT(EXTRACT(YEAR FROM mbp.recorded_at)::TEXT, 2)', 'year') // this extract the last two digits in the year exp : 2021 => 21
      .addSelect('EXTRACT(MONTH FROM mbp.recorded_at)', 'month')
      .addSelect('ROUND(AVG(mbp.diastolic), 2)', 'average_diastolic')
      .addSelect('ROUND(AVG(mbp.systolic), 2)', 'average_systolic')
      .where('mbp.patient_id = :patientId', { patientId })
      .groupBy('EXTRACT(YEAR FROM mbp.recorded_at)')
      .addGroupBy('EXTRACT(MONTH FROM mbp.recorded_at)')
      .orderBy('year', 'ASC')
      .addOrderBy('month', 'ASC')
      .getRawMany();
  }

  async createMany(rows: CreateMetricBloodPressureDto[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.insert(MetricBloodPressure, rows);
      await queryRunner.commitTransaction();
      return { success: true, message: 'Records successfully inserted' };
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      return {
        success: false ,
        message: `error from inserting rows in metric_blood_pressure  :${error.message}`,
      };
    }finally{
      await queryRunner.release()
    }
  }
}
