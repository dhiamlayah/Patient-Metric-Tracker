import { Repository, EntityRepository, DataSource } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientRepository extends Repository<Patient> {
  constructor(private dataSource: DataSource) {
    super(Patient, dataSource.createEntityManager());
  }

  async getPatientsWithMetrics(start: number = 0) {
    const selectFields = [
      'p.username',
      'ma.recorded_at',
      'ma.value',
      'mbp.systolic',
      'mbp.diastolic',
      'mbp.recorded_at',
    ];

    const metricBloodPressureJoinCondition = `mbp.patient_id = p.id AND mbp.recorded_at = (select MAX(mbp2.recorded_at) FROM metric_blood_pressure AS mbp2 WHERE  mbp2.patient_id = p.id  ) or mbp.recorded_at is null  `;

    const metricA1cJoinCondition = `ma.patient_id = p.id AND ma.recorded_at = (select MAX(ma2.recorded_at) FROM metric_a1c AS ma2 WHERE  ma2.patient_id = p.id  ) or ma.recorded_at is null `;

    const queryBuilder = this.createQueryBuilder('p');
    await queryBuilder
      .select(selectFields)
      .leftJoin('p.metricA1c', 'ma', metricA1cJoinCondition)
      .leftJoin(
        'p.metricBloodPressure',
        'mbp',
        metricBloodPressureJoinCondition,
      )
      .offset(start)
      .limit(start + 10);
    return queryBuilder.getManyAndCount();
  }
}
