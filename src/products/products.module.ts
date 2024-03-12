import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { BrandsController } from './controllers/brands.controller';

import { ProductsService } from './services/products.service';
import { BransService } from './services/brans.service';
import { CategorysService } from './services/categorys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Categorie } from './entities/categorie.entity';
import { Bran } from './entities/bran.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Product, Categorie, Bran])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategorysService, BransService],
  exports: [ProductsService],
})
export class ProductsModule {}
