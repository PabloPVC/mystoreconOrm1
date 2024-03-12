import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dtos';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }
  @Get()
  getCustomers(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.customersService.findAll();
  }
  @Post()
  createCustumer(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }
  @Put(':id')
  updateCustumers(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCustomerDto,
  ): any {
    return this.customersService.update(id, body);
  }
  @Delete(':id')
  deleteCustumer(@Param('id', ParseIntPipe) id: number): any {
    return this.customersService.remove(id);
  }
}
