import {
  IsString,
  MinLength,
  IsEmail,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  @MinLength(3)
  nombre!: string;

  @IsEmail()
  correo!: string;

  @IsString()
  carrera!: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  semestre_actual?: number;
}
