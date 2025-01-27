import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetricBloodPressureService } from './metric_blood_pressure.service';
import { CreateMetricBloodPressureDto } from './dto/create-metric_blood_pressure.dto';

@Controller('metric-blood-pressure')
export class MetricBloodPressureController {
  constructor(private readonly metricBloodPressureService: MetricBloodPressureService) {}

  @Post()
  create(@Body() createMetricBloodPressureDto: CreateMetricBloodPressureDto) {
    return this.metricBloodPressureService.create(createMetricBloodPressureDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metricBloodPressureService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string , @Body() body:{recorded_at:Date}) {
    return this.metricBloodPressureService.remove(+id,body.recorded_at);
  }
}
