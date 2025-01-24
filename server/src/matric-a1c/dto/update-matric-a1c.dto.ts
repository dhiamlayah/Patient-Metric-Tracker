import { PartialType } from '@nestjs/mapped-types';
import { CreateMatricA1cDto } from './create-matric-a1c.dto';

export class UpdateMatricA1cDto extends PartialType(CreateMatricA1cDto) {}
