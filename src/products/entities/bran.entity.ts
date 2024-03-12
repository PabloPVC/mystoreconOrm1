import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { Exclude } from 'class-transformer';
@Entity('brans')
export class Bran {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  nombre: string;
  @Column()
  estado: boolean;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
