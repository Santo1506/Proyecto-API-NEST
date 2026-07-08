import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { InscripcionService } from './inscripcion.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Controller('inscripciones')
export class InscripcionController {

  constructor(
    private readonly inscripcionService: InscripcionService,
  ) {}

  @Post()
  create(@Body() createInscripcionDto: CreateInscripcionDto) {
    return this.inscripcionService.create(createInscripcionDto);
  }

  @Get()
  findAll() {
    return this.inscripcionService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.inscripcionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInscripcionDto: UpdateInscripcionDto,
  ) {
    return this.inscripcionService.update(id, updateInscripcionDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.inscripcionService.remove(id);
  }

}