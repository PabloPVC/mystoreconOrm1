import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { OrderDetalle } from 'src/users/entities/order_detalle.entity';
import { Categorie } from './categorie.entity';
import { Bran } from './bran.entity';
import { Exclude } from 'class-transformer';

@Entity('products')
@Index(['precio_unitario', 'stock'])
export class Product {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  nombre: string;
  @Column()
  description: string;
  @Index()
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_unitario: number;
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  stock: number;
  @Column()
  image: string;
  @Column()
  estado: boolean;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(() => OrderDetalle, (orderDetalle) => orderDetalle.product)
  productos: OrderDetalle[];

  @ManyToOne(() => Categorie, (categorie) => categorie.productos)
  @JoinColumn({ name: 'categorie_id' })
  categorie: Categorie;

  @ManyToOne(() => Bran, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Bran;
}
