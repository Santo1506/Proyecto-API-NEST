import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Inscripcion } from '../inscripcion/entities/inscripcion.entity';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Inscripcion])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}