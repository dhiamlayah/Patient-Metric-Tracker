import { PartialType } from '@nestjs/mapped-types';
import { CreateMetricBloodPressureDto } from './create-metric_blood_pressure.dto';

export class UpdateMetricBloodPressureDto extends PartialType(CreateMetricBloodPressureDto) {}
