import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateProfesorDto {
  @IsString()
  @MinLength(3)
  nombre!: string;

  @IsEmail()
  correo!: string;

  @IsString()
  @MinLength(3)
  departamento!: string;
}
