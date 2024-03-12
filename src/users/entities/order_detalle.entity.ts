import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('ordersdetalle')
export class OrderDetalle {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;

  @ManyToOne(() => Order, (order) => order.detalles)
  @JoinColumn({ name: 'orden_id' })
  orden: Order;

  @ManyToOne(() => Product, (product) => product.productos)
  @JoinColumn({ name: 'producto_id' })
  product: Product;

  @Column()
  cantidad: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_unitario: number;
}
