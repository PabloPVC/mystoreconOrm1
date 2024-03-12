import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { House } from './house.model';
import { Valoracion } from './valoracion.model';

@Entity('valoracion_house')
export class Valoracion_House {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @ManyToOne(() => Valoracion, (valoracion) => valoracion.id)
  @JoinColumn({ name: 'valoracion_id' })
  valoracion: Valoracion;

  @ManyToOne(() => House, (house) => house.id)
  @JoinColumn({ name: 'house_id' })
  house: House;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deleted_at: Date;
}
