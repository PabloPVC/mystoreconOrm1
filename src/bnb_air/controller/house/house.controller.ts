import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HouseService } from '../../services/house/house.service';
import { CreateHouseDto } from '../../dto/house.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('houses')
@ApiTags('houses')
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Get()
  @ApiOperation({ summary: 'List of houses' })
  getHouses() {
    return this.houseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'return one house' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.houseService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateHouseDto) {
    return this.houseService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateHouseDto,
  ): any {
    return this.houseService.update(+id, body);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.houseService.delete(id);
  }
}
