import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Curso } from '../../curso/entities/curso.entity';

@Entity('profesor')
export class Profesor {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Curso, (curso) => curso.profesor)
  cursos!: Curso[];

  @Column('varchar', { length: 50 })
  nombre!: string;

  @Column('varchar', { length: 100 })
  correo!: string;

  @Column('varchar', { length: 50 })
  departamento!: string;

  @CreateDateColumn({ name: 'fecha_contratacion' })
  fechaContratacion!: Date;
}
