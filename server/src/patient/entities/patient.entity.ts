import { MatricA1c } from "src/matric-a1c/entities/matric-a1c.entity";
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type: 'timestamp with time zone', default: ()=>'CURRENT_TIMESTAMP' })
    created_at:Date;

    @Column({type: 'timestamp with time zone', default: ()=>'CURRENT_TIMESTAMP' })
    updated_at:Date;
    
    @Column({type:'varchar',length: 30})
    username:string;    

    @OneToMany(() => MatricA1c, (matricA1c) => matricA1c.patient , { onDelete: "CASCADE" })
    matricA1c:Patient ;
  
}
