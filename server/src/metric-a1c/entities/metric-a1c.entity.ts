import { Patient } from "src/patient/entities/patient.entity";
import {  Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MetricA1c {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'numeric', nullable:false })
    value:number

    @Column({type:'date', default:()=>'CURRENT_DATE' })
    recorded_at:Date

    @Column({type:'integer'})
    patient_id:number

    @ManyToOne(() => Patient, (patient) => patient.metricA1c , { onDelete: "CASCADE" })
    @JoinColumn({ name: 'patient_id' }) 
    patient:Patient ;
} 
