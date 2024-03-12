import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { OrderDetalle } from '../entities/order_detalle.entity';

import {
  CreateOrderDetalleDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dto/order.dtos';
@Injectable()
export class OrdesService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(OrderDetalle)
    private readonly orderDetalleRepository: Repository<OrderDetalle>,
  ) {}

  async findAll() {
    return await this.orderRepository.find({
      relations: ['detalles'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['detalles'],
    });
    if (!order) {
      throw new NotFoundException(`Order con id: ${id} no existe`);
    }
    return order;
  }
  async create(payload: CreateOrderDto) {
    const { customer_id } = payload;
    const cliente = await this.customerRepository.findOneBy({
      id: customer_id,
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id: ${customer_id} no existe`);
    }
    const newOrder = this.orderRepository.create({ ...payload });
    newOrder.customer = cliente;

    return await this.orderRepository.save(newOrder);
  }
  async update(id: number, payload: UpdateOrderDto) {
    const { customer_id } = payload;
    const cliente = await this.customerRepository.findOneBy({
      id: customer_id,
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id: ${customer_id} no existe`);
    }
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order con id: ${id} no existe`);
    }
    this.orderRepository.merge(order, payload);
    order.customer = cliente;
    return this.orderRepository.save(order);
  }
  async remove(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order con id: ${id} no existe`);
    }
    return await this.orderRepository.softRemove(order);
  }
  async createDetalle(payload: CreateOrderDetalleDto) {
    const newOrderDetalle = this.orderDetalleRepository.create({ ...payload });
    return await this.orderDetalleRepository.save(newOrderDetalle);
  }
}
