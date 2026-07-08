import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Inscripcion } from './entities/inscripcion.entity';
import { Estudiante } from '../estudiante/entities/estudiante.entity';
import { Curso } from '../curso/entities/curso.entity';

import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto';

@Injectable()
export class InscripcionService {

  private readonly logger = new Logger('InscripcionService');

  constructor(

    @InjectRepository(Inscripcion)
    private readonly inscripcionRepository: Repository<Inscripcion>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Curso)
    private readonly cursoRepository: Repository<Curso>,

  ) {}

  async create(createInscripcionDto: CreateInscripcionDto) {

    try {
      const estudiante = await this.estudianteRepository.findOne({
        where: { id: createInscripcionDto.estudiante_id },
      });

      if (!estudiante)
        throw new NotFoundException(
          `Estudiante con id ${createInscripcionDto.estudiante_id} no encontrado`,
        );

      const curso = await this.cursoRepository.findOne({
        where: { id: createInscripcionDto.curso_id },
      });

      if (!curso)
        throw new NotFoundException(
          `Curso con id ${createInscripcionDto.curso_id} no encontrado`,
        );

      const inscripcion =
        this.inscripcionRepository.create(createInscripcionDto);

      await this.inscripcionRepository.save(inscripcion);

      return inscripcion;

    } catch (error) {

      this.handleDBExceptions(error);

    }

  }

  async findAll() {
    return await this.inscripcionRepository.find({
      relations: {
        estudiante: true,
        curso: true,
      },
      order: {
        id: 'ASC',
      },
    });

  }

  async findOne(id: number) {
    const inscripcion = await this.inscripcionRepository.findOne({
      where: { id },
      relations: {
        estudiante: true,
        curso: true,
      },
    });

    if (!inscripcion)
      throw new NotFoundException(
        `Inscripción con id ${id} no encontrada`,
      );

    return inscripcion;

  }

  async update(
    id: number,
    updateInscripcionDto: UpdateInscripcionDto,
  ) {
    const inscripcion =
      await this.inscripcionRepository.preload({
        id,
        ...updateInscripcionDto,
      });

    if (!inscripcion)
      throw new NotFoundException(
        `Inscripción con id ${id} no encontrada`,
      );

    try {
      if (updateInscripcionDto.estudiante_id) {

        const estudiante =
          await this.estudianteRepository.findOne({
            where: {
              id: updateInscripcionDto.estudiante_id,
            },
          });

        if (!estudiante)
          throw new NotFoundException(
            `Estudiante con id ${updateInscripcionDto.estudiante_id} no encontrado`,
          );

      }
      if (updateInscripcionDto.curso_id) {

        const curso =
          await this.cursoRepository.findOne({
            where: {
              id: updateInscripcionDto.curso_id,
            },
          });

        if (!curso)
          throw new NotFoundException(
            `Curso con id ${updateInscripcionDto.curso_id} no encontrado`,
          );

      }

      await this.inscripcionRepository.save(inscripcion);

      return this.findOne(id);

    } catch (error) {

      this.handleDBExceptions(error);

    }

  }

  async remove(id: number) {
    const inscripcion = await this.findOne(id);

    await this.inscripcionRepository.remove(inscripcion);

  }

  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );

  }

}