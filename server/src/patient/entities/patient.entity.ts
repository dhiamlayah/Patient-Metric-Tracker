import { MetricA1c } from 'src/metric-a1c/entities/metric-a1c.entity';
import { MetricBloodPressure } from 'src/metric_blood_pressure/entities/metric_blood_pressure.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'varchar', length: 30 })
  username: string;

  @OneToMany(() => MetricA1c, (metricA1c) => metricA1c.patient, {
    onDelete: 'CASCADE',
  })
  metricA1c: MetricA1c[];
  
  @OneToMany(
    () => MetricBloodPressure,
    (merticBloodPressure) => merticBloodPressure.patient,
    { onDelete: 'CASCADE' },
  )
  metricBloodPressure: MetricBloodPressure[];
}
