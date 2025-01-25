import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetricBloodPressureService } from './metric_blood_pressure.service';
import { CreateMetricBloodPressureDto } from './dto/create-metric_blood_pressure.dto';
import { UpdateMetricBloodPressureDto } from './dto/update-metric_blood_pressure.dto';

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMetricBloodPressureDto: UpdateMetricBloodPressureDto) {
  //   return this.metricBloodPressureService.update(+id, updateMetricBloodPressureDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.metricBloodPressureService.remove(+id);
  // }
}
