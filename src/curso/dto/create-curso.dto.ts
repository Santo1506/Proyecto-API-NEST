import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  nombre!: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  cant_creditos?: number;

  @IsOptional()
  @IsNumber()
  profesor_id?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  cupo_max?: number;
}
