import { IsDate, IsNumber } from "class-validator";

export class CreateMetricBloodPressureDto {
    @IsNumber()
    systolic:number;

    @IsNumber()
    diastolic:number;

    @IsDate()
    recorded_at:Date;
    
    @IsNumber()
    patient_id;
}
