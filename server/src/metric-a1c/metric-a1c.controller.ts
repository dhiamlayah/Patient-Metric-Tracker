import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetricA1cService } from './metric-a1c.service';
import { CreateMetricA1cDto } from './dto/create-metric-a1c.dto';
import { UpdateMetricA1cDto } from './dto/update-metric-a1c.dto';

@Controller('metric-a1c')
export class MetricA1cController {
  constructor(private readonly metricA1cService: MetricA1cService) {}

  @Post()
  create(@Body() createMetricA1cDto: CreateMetricA1cDto) {
    return this.metricA1cService.create(createMetricA1cDto);
  }

  @Get()
  findAll() {
    return this.metricA1cService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metricA1cService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetricA1cDto: UpdateMetricA1cDto) {
    return this.metricA1cService.update(+id, updateMetricA1cDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metricA1cService.remove(+id);
  }
}
