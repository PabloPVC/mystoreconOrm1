import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Order } from './../../users/entities/order.entity';
import { Exclude } from 'class-transformer';
@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  identificacion: string;
  @Column()
  nombre: string;
  @Column()
  image: string;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
