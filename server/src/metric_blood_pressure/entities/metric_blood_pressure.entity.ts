import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MetricBloodPressure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: false })
  systolic: number;

  @Column({ type: 'numeric', nullable: false })
  diastolic: number;

  @Index('blood_pressure_index')
  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  recorded_at: Date;

  @Column({ type: 'integer' }) 
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.metricBloodPressure, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}
