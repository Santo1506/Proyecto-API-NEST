import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Curso } from '../curso/entities/curso.entity';
import { Nota } from '../notas/entities/nota.entity';
import { InscripcionService } from './inscripcion.service';
import { InscripcionController } from './inscripcion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inscripcion, Estudiante, Curso, Nota])],
  controllers: [InscripcionController],
  providers: [InscripcionService],
})
export class InscripcionModule {}