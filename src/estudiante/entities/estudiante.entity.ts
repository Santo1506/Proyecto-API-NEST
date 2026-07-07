import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Inscripcion } from '../../inscripcion/entities/inscripcion.entity';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  nombre!: string;

  @Column({ type: 'varchar', length: 100 })
  correo!: string;

  @Column({ type: 'varchar', length: 50 })
  carrera!: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  semestre_actual!: number;

  @CreateDateColumn({ name: 'fecha_ingreso' })
  fechaIngreso!: Date;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: 'activo',
  })
  estado!: string;

  @OneToMany(() => Inscripcion, (inscripcion) => inscripcion.estudiante)
  inscripciones!: Inscripcion[];
}
