/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inscripcion } from '../../inscripcion/entities/inscripcion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('nota')
export class Nota {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo_evaluacion!: string;

  @Column({ type: 'int', nullable: true })
  valor_nota!: number;

  @CreateDateColumn({ name: 'fecha' })
  fecha!: Date;

  @ManyToOne(() => Inscripcion, (inscripcion) => inscripcion.notas)
  @JoinColumn({ name: 'inscripcion_id' })
  inscripcion!: Inscripcion;
}
