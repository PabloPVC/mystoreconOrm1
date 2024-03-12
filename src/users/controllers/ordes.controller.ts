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

import { OrdesService } from '../services/ordes.service';

import {
  CreateOrderDetalleDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dto/order.dtos';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Ordes')
@Controller('ordes')
export class OrdesController {
  constructor(private ordesService: OrdesService) {}
  @Get()
  getOrdes(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.ordesService.findAll();
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordesService.findOne(id);
  }
  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordesService.create(payload);
  }
  @Post('detalle')
  createDetalle(@Body() payload: CreateOrderDetalleDto) {
    return this.ordesService.createDetalle(payload);
  }
  @Put(':id')
  updateOrde(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOrderDto,
  ): any {
    return this.ordesService.update(id, body);
  }
  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number): any {
    return this.ordesService.remove(id);
  }
}
