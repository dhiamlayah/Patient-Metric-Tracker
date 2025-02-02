import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MetricBloodPressureService } from './metric_blood_pressure.service';
import { CreateMetricBloodPressureDto } from './dto/create-metric_blood_pressure.dto';

@Controller('metric-blood-pressure')
export class MetricBloodPressureController {
  constructor(private readonly metricBloodPressureService: MetricBloodPressureService) {}

  @Post()
  create(@Body() createMetricBloodPressureDto: CreateMetricBloodPressureDto) {
    return this.metricBloodPressureService.create(createMetricBloodPressureDto);
  }
  @Post('many')
  createMany(@Body() createMetricA1cDto: CreateMetricBloodPressureDto[]) {
    return this.metricBloodPressureService.createMany(createMetricA1cDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Query('skip') skip?: number) {
    return this.metricBloodPressureService.findOne(+id,skip);
  }

  @Get(':id/avg')
  getAvrageByMonths(@Param('id') id: string){
    return this.metricBloodPressureService.getAvrageByMonths(+id)
  }


  @Delete(':id')
  remove(@Param('id') id: string , @Body() body:{recorded_at:Date}) {
    return this.metricBloodPressureService.remove(+id,body.recorded_at);
  }
}
