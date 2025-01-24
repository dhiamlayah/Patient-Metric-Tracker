import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
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

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  recorded_at: Date;

  @Column({ type: 'integer' }) 
  patient_id: number;

  @ManyToOne(() => Patient, (patient) => patient.marticBloodPressure, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}
