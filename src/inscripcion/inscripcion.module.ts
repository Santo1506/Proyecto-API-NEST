import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InscripcionController } from './inscripcion.controller';
import { InscripcionService } from './inscripcion.service';

import { Inscripcion } from './entities/inscripcion.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Curso } from '../curso/entities/curso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inscripcion,
      Estudiante,
      Curso,
    ]),
  ],
  controllers: [
    InscripcionController,
  ],
  providers: [
    InscripcionService,
  ],
  exports: [
    InscripcionService,
    TypeOrmModule,
  ],
})
export class InscripcionModule {}