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
} from '@nestjs/common';

import { CategorysService } from '../services/categorys.service';

import {
  CreateCategorieDto,
  UpdateCategorieDto,
} from '../dto/categorie.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categories')
export class CategoriesController {
  constructor(private categorysService: CategorysService) {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: string) {
    return this.categorysService.findOne(+id);
  }
  @Get()
  getCategories(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.categorysService.findAll();
  }
  @Post()
  create(@Body() payload: CreateCategorieDto) {
    return this.categorysService.create(payload);
  }
  @Put(':id')
  updateCategorie(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategorieDto,
  ): any {
    return this.categorysService.update(id, body);
  }
  @Delete(':id')
  deleteCategories(@Param('id', ParseIntPipe) id: number): any {
    return this.categorysService.remove(id);
  }
}
