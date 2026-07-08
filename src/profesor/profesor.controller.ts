import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Controller('api/profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get()
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profesorService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfesorDto: UpdateProfesorDto,
  ) {
    return this.profesorService.update(id, updateProfesorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profesorService.remove(id);
  }
}
