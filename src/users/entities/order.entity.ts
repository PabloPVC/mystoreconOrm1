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
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { OrderDetalle } from './order_detalle.entity';
import { Customer } from './customer.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  numero_fac: string;
  @Column()
  fecha_orden: Date;
  @Column()
  total: number;
  @Column()
  descuento: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'cliente_id' })
  customer: Customer;

  @Column()
  estado: string; /*pendiente", "en proceso" o "completada" */
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;
  @OneToMany(() => OrderDetalle, (orderDetalle) => orderDetalle.orden, {
    cascade: true,
  })
  detalles: OrderDetalle[];
}
