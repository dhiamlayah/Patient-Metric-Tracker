import { IsDate, IsNumber } from "class-validator";

export class CreateMatricA1cDto {
    @IsNumber()
    value:number;
    @IsDate()
    recorded_at:Date;
    @IsNumber()
    patient_id;
}
