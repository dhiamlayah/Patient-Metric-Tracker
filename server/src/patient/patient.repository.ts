import { Repository, EntityRepository, DataSource } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientRepository extends Repository<Patient> {
  constructor(private dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }

  private async joinThreeTables() {
    const selectFields = [
      'p.username',
      'p.id',
      'ma.recorded_at',
      'ma.value',
      'mbp.systolic',
      'mbp.diastolic',
      'mbp.recorded_at',
    ];
    const metricBloodPressureJoinCondition = `mbp.patient_id = p.id AND mbp.recorded_at = (select MAX(mbp2.recorded_at) FROM metric_blood_pressure AS mbp2 WHERE  mbp2.patient_id = p.id  ) or mbp.recorded_at is null  `;

    const metricA1cJoinCondition = `ma.patient_id = p.id AND ma.recorded_at = (select MAX(ma2.recorded_at) FROM metric_a1c AS ma2 WHERE  ma2.patient_id = p.id  ) or ma.recorded_at is null `;

    const queryBuilder = await this.createQueryBuilder('p');
    return await queryBuilder
      .select(selectFields)
      .leftJoin('p.metricA1c', 'ma', metricA1cJoinCondition)
      .leftJoin(
        'p.metricBloodPressure',
        'mbp',
        metricBloodPressureJoinCondition,
      );
  }

  async getPatientsWithMetrics(startFrom: number = 0) {
    return (await this.joinThreeTables())
      .offset(startFrom)
      .limit(startFrom + 20)
      .getManyAndCount();
  }

  async getSinglePatientWithMetrics(id: number) {
    return (await this.joinThreeTables()).where(`p.id=${id}`).getOne();
  }
}
