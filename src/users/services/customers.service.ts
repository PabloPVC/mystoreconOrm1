import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dtos';
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer con id: ${id} no existe`);
    }
    return customer;
  }
  async create(payload: CreateCustomerDto) {
    const newCustumer = this.customerRepository.create({ ...payload });
    return this.customerRepository.save(newCustumer);
  }
  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer con id: ${id} no existe`);
    }
    this.customerRepository.merge(customer, payload);
    return this.customerRepository.save(customer);
  }
  async remove(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer con id: ${id} no existe`);
    }
    return await this.customerRepository.softRemove(customer);
  }
}
