import { PartialType } from '@nestjs/mapped-types';
import { CreateMetricA1cDto } from './create-metric-a1c.dto';

export class UpdateMetricA1cDto extends PartialType(CreateMetricA1cDto) {}
