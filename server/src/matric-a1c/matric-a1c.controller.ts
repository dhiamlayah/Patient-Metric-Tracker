import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatricA1cService } from './matric-a1c.service';
import { CreateMatricA1cDto } from './dto/create-matric-a1c.dto';
import { UpdateMatricA1cDto } from './dto/update-matric-a1c.dto';

@Controller('matric-a1c')
export class MatricA1cController {
  constructor(private readonly matricA1cService: MatricA1cService) {}

  @Post()
  create(@Body() createMatricA1cDto: CreateMatricA1cDto) {
    return this.matricA1cService.create(createMatricA1cDto);
  }

  @Get()
  findAll() {
    return this.matricA1cService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matricA1cService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatricA1cDto: UpdateMatricA1cDto) {
    return this.matricA1cService.update(+id, updateMatricA1cDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matricA1cService.remove(+id);
  }
}
