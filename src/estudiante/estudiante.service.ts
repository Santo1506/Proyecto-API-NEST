import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UpdateEstudianteDto } from "./dto/update-estudiante.dto";
import { CreateEstudianteDto } from "./dto/create-estudiante.dto";
import { Estudiante } from "./entities/estudiante.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EstudianteService {
  private readonly logger = new Logger('EstudianteService');

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    try {
      const estudiante = this.estudianteRepository.create(createEstudianteDto);
      await this.estudianteRepository.save(estudiante);
      return estudiante;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.estudianteRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
    });
    if (!estudiante)
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    return estudiante;
  }

  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    const estudiante = await this.estudianteRepository.preload({
      id,
      ...updateEstudianteDto,
    });
    if (!estudiante)
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    try {
      await this.estudianteRepository.save(estudiante);
      return estudiante;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number) {
    const estudiante = await this.findOne(id);
    await this.estudianteRepository.remove(estudiante);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}