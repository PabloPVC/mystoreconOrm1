import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dto/products.dtos';
import { Configuration } from './../../config/config.keys';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Categorie } from '../entities/categorie.entity';
import { Bran } from '../entities/bran.entity';

@Injectable()
export class ProductsService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Categorie)
    private readonly categoriyRepository: Repository<Categorie>,
    @InjectRepository(Bran) private readonly branRepository: Repository<Bran>,
  ) {}
  api_key = this.configService.get(Configuration.API_KEY);

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.precio_unitario = Between(minPrice, maxPrice);
      }
      return this.productRepository.find({
        relations: ['categorie', 'brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepository.find({
      relations: ['categorie', 'brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['categorie', 'brand'],
    });
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no existe.`);
    }
    return product;
  }
  async create(payload: CreateProductDto) {
    const { categorie_id } = payload;
    const categori = await this.categoriyRepository.findOne({
      where: { id: categorie_id },
      relations: ['categorie', 'brand'],
    });
    if (!categori) {
      throw new NotFoundException(
        `Categorie con id: ${categorie_id} no existe`,
      );
    }
    const band = await this.branRepository.findOneBy({ id: payload.brand_id });
    if (!band) {
      throw new NotFoundException(
        `Brand con id: ${payload.brand_id} no existe`,
      );
    }
    const newProduct = this.productRepository.create({ ...payload });
    newProduct.categorie = categori;
    newProduct.brand = band;
    return await this.productRepository.save(newProduct);
  }
  async update(id: number, payload: UpdateProductDto) {
    const { categorie_id } = payload;
    const categori = await this.categoriyRepository.findOneBy({
      id: categorie_id,
    });
    if (!categori) {
      throw new NotFoundException(
        `Categorie con id: ${categorie_id} no existe`,
      );
    }
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con id: ${id} no existe`);
    }
    const band = await this.branRepository.findOneBy({ id: payload.brand_id });
    if (!band) {
      throw new NotFoundException(
        `Brand con id: ${payload.brand_id} no existe`,
      );
    }
    product.brand = band;
    product.categorie = categori;
    this.productRepository.merge(product, payload);
    return await this.productRepository.save(product);
  }
  async remove(id: number) {
    const user = await this.productRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Producto con id: ${id} no existe`);
    }
    return await this.productRepository.softRemove(user);
  }
}
