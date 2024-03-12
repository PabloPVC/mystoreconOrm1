import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Valoracion_House } from './valoracion_house.model';

@Entity('valoracion')
export class Valoracion {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  title: string;
  @Column('decimal', { precision: 6, scale: 2 })
  valor: number;
  @Column()
  icon: string;

  @OneToMany(() => Valoracion_House, (valoracion) => valoracion.id)
  valoracion_house: Valoracion_House[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deleted_at: Date;
}
