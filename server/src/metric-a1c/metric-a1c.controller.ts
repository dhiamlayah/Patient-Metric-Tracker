import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { MetricA1cService } from './metric-a1c.service';
import { CreateMetricA1cDto } from './dto/create-metric-a1c.dto';

@Controller('metric-a1c')
export class MetricA1cController {
  constructor(private readonly metricA1cService: MetricA1cService) {}

  @Post()
  create(@Body() createMetricA1cDto: CreateMetricA1cDto) {
    return this.metricA1cService.create(createMetricA1cDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string,@Query('skip') skip?: number) {
    return this.metricA1cService.findOne(+id,skip);
  }

  @Get(':id/avg')
  getAvrageByMonths(@Param('id') id: string){
    return this.metricA1cService.getAvrageByMonths(+id)
  }


  @Delete(':id')
  remove(@Param('id') id: string , @Body() body:{recorded_at:Date}) {
    return this.metricA1cService.remove(+id,body.recorded_at);
  }
}
