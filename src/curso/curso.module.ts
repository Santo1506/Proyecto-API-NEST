import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Profesor } from '../profesor/entities/profesor.entity';
import { Inscripcion } from '../inscripcion/entities/inscripcion.entity';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Curso, Profesor, Inscripcion])],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}
