import { IsNotEmpty, IsString } from "class-validator";

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    username :string
}
