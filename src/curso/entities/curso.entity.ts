import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { Inscripcion } from '../../inscripcion/entities/inscripcion.entity';

@Entity('curso')
export class Curso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  nombre!: string;

  @Column({ type: 'int', nullable: true })
  cant_creditos!: number;

  @Column({ type: 'int', nullable: true })
  cupo_max!: number;

  @ManyToOne(() => Profesor, (profesor) => profesor.cursos)
  @JoinColumn({ name: 'profesor_id' })
  profesor!: Profesor;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.curso)
  inscripciones!: Inscripcion[];
}
