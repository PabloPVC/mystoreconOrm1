import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorie } from '../entities/categorie.entity';
import { Repository } from 'typeorm';
import {
  CreateCategorieDto,
  UpdateCategorieDto,
} from '../dto/categorie.entity';

@Injectable()
export class CategorysService {
  constructor(
    @InjectRepository(Categorie)
    private readonly categoriyRepository: Repository<Categorie>,
  ) {}

  async findAll() {
    return await this.categoriyRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriyRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category con id: ${id} no existe.`);
    }
    return category;
  }

  async create(payload: CreateCategorieDto) {
    const newcategorie = this.categoriyRepository.create({ ...payload });
    return await this.categoriyRepository.save(newcategorie);
  }
  async update(id: number, payload: UpdateCategorieDto) {
    const categorie = await this.categoriyRepository.findOneBy({ id });
    if (!categorie) {
      throw new NotFoundException(`Categiria con id: ${id} no existe`);
    }
    this.categoriyRepository.merge(categorie, payload);
    return this.categoriyRepository.save(categorie);
  }
  async remove(id: number) {
    const categorie = await this.categoriyRepository.findOneBy({ id });
    if (!categorie) {
      throw new NotFoundException(`Categiria con id: ${id}  no existe`);
    }
    return await this.categoriyRepository.softRemove(categorie);
  }
}
