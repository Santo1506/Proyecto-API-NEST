import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';

import { Estudiante } from './entities/estudiante.entity';
import { Inscripcion } from '../inscripcion/entities/inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Estudiante,
      Inscripcion,
    ]),
  ],
  controllers: [
    EstudianteController,
  ],
  providers: [
    EstudianteService,
  ],
  exports: [
    EstudianteService,
    TypeOrmModule,
  ],
})
export class EstudianteModule {}