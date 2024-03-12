import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Body,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dto/products.dtos';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }
  @Put(':id')
  updateProducto(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ): any {
    return this.productsService.update(+id, body);
  }
  @Delete(':id')
  deleteProducto(@Param('id', ParseIntPipe) id: number): any {
    return this.productsService.remove(id);
  }
}
