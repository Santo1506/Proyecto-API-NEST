import { Curso } from 'src/curso/entities/curso.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Nota } from 'src/notas/entities/nota.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('inscripcion')
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: 'activo',
  })
  estado!: string;

  @CreateDateColumn({ name: 'fecha_inscripcion' })
  fechaInscripcion!: Date;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.inscripciones)
  @JoinColumn({ name: 'estudiante_id' })
  estudiante!: Estudiante;

  @ManyToOne(() => Curso, (curso) => curso.inscripciones)
  @JoinColumn({ name: 'curso_id' })
  curso!: Curso;

  @OneToMany(() => Nota, (nota) => nota.inscripcion)
  notas!: Nota[];
}
