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

import { BransService } from '../services/brans.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private bransService: BransService) {}
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.bransService.findOne(id);
  }
  @Get()
  getBrands(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.bransService.findAll();
  }
  @Post()
  create(@Body() payload: any) {
    return this.bransService.create(payload);
  }
  @Put(':id')
  updateBrand(@Param('id', ParseIntPipe) id: number, @Body() body: any): any {
    return this.bransService.update(id, body);
  }
  @Delete(':id')
  deleteBrand(@Param('id', ParseIntPipe) id: number): any {
    return this.bransService.remove(id);
  }
}
