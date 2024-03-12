import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Valoracion_House } from './valoracion_house.model';
import { Image } from './images.model';
import { LocationOfrece } from './location-ofrece.model';

@Entity('house')
export class House {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  name: string;
  @Column()
  ciudad: string;
  @Column()
  longitud: string;
  @Column()
  latitud: string;
  @Column()
  estado: number;
  @Column()
  foto: string;

  @OneToMany(
    () => Valoracion_House,
    (valoracion_house) => valoracion_house.house,
  )
  valoraciones: Valoracion_House[];

  @OneToMany(() => Image, (image) => image.house)
  images: Image[];

  @OneToMany(() => LocationOfrece, (location) => location.house)
  locationOfrece: LocationOfrece[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  public deleted_at: Date;
}
