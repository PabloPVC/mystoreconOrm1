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

import { MenuService } from '../services/menu.service';

import { CreateMenuDtos, UpdateMenuDto } from '../dto/menu.dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Menus')
@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getMenus() {
    return this.menuService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateMenuDtos) {
    return this.menuService.create(payload);
  }

  @Put(':id')
  updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateMenuDto,
  ): any {
    return this.menuService.update(id, body);
  }

  @Delete(':id')
  deleteUsers(@Param('id', ParseIntPipe) id: number): any {
    return this.menuService.remove(id);
  }
}
