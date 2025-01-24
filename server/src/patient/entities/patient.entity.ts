import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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



}
