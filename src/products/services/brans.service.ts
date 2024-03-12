import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bran } from '../entities/bran.entity';

import { CreateBranDto, UpdateBranDto } from '../dto/bran.dtos';

@Injectable()
export class BransService {
  constructor(
    @InjectRepository(Bran)
    private readonly BranRepository: Repository<Bran>,
  ) {}

  async findAll() {
    return await this.BranRepository.find({
      relations: ['products'],
    });
  }

  async findOne(id: number) {
    const bran = await this.BranRepository.findOne({
      where: { id: id },
      relations: ['products'],
    });
    if (!bran) {
      throw new NotFoundException(`Bran con id: ${id} no existe.`);
    }
    return bran;
  }
  async create(payload: CreateBranDto) {
    const bran = this.BranRepository.create({ ...payload });
    return await this.BranRepository.save(bran);
  }
  async update(id: number, payload: UpdateBranDto) {
    const bran = await this.BranRepository.findOneBy({ id });
    if (!bran) {
      throw new NotFoundException(`Bran con id: ${id} no existe`);
    }
    this.BranRepository.merge(bran, payload);
    return this.BranRepository.save(bran);
  }
  async remove(id: number) {
    const bran = await this.BranRepository.findOneBy({ id });
    if (!bran) {
      throw new NotFoundException(`Bran con id: ${id}  no existe`);
    }
    return await this.BranRepository.softRemove(bran);
  }
}
