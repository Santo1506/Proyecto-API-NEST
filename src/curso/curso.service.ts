import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './entities/curso.entity';
import { Profesor } from '../profesor/entities/profesor.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    if (createCursoDto.profesor_id) {
      const profesor = await this.profesorRepository.findOne({
        where: { id: createCursoDto.profesor_id },
      });
      if (!profesor) {
        throw new NotFoundException('Profesor no encontrado');
      }
    }

    const curso = this.cursoRepository.create(createCursoDto);
    return await this.cursoRepository.save(curso);
  }

  async findAll() {
    return await this.cursoRepository.find();
  }

  async findOne(id: number) {
    const curso = await this.cursoRepository.findOne({
      where: { id },
    });

    if (!curso) {
      throw new NotFoundException('Curso no encontrado');
    }

    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id);

    if (updateCursoDto.profesor_id) {
      const profesor = await this.profesorRepository.findOne({
        where: { id: updateCursoDto.profesor_id },
      });
      if (!profesor) {
        throw new NotFoundException('Profesor no encontrado');
      }
    }

    await this.cursoRepository.update(id, updateCursoDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    const curso = await this.findOne(id);
    return await this.cursoRepository.remove(curso);
  }
}