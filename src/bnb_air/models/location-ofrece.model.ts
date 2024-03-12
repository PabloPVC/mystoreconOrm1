import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { House } from './house.model';

@Entity('locationOfrece')
export class LocationOfrece {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deleted_at: Date;

  @ManyToOne(() => House, (house) => house.locationOfrece)
  @JoinColumn({ name: 'house_id' })
  house: House;
}
