import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientrDto: CreatePatientDto) {
    return this.patientService.create(createPatientrDto);
  }

  @Get()
  findAll(@Query('startFrom') startFrom?:number) {
    return this.patientService.findAll(startFrom);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

}
