import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInscripcionDto {
  @IsOptional()
  @IsString()
  estado?: string;

  @IsNumber()
  estudiante_id!: number;

  @IsNumber()
  curso_id!: number;
}
