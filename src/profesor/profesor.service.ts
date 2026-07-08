import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  async create(createProfesorDto: CreateProfesorDto) {
   return await this.profesorRepository.save(createProfesorDto);
  }

  async findAll() {
    return await this.profesorRepository.find();
  }

  async findOne(id: number) {
      const profesor = await this.profesorRepository.findOne({
        where: { id },
      });

      if (!profesor) {
        throw new NotFoundException('Profesor no encontrado');
      }

      return profesor;
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto) {
    await this.findOne(id); // Verifica que existe
    await this.profesorRepository.update(id, updateProfesorDto);
    return await this.findOne(id); // Retorna el actualizado
  }

  async remove(id: number) {
    const profesor = await this.findOne(id); // Verifica que existe
    return await this.profesorRepository.remove(profesor);
  }
}