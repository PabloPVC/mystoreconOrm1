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
import { ValoracionesService } from '../../../services/valoracion/valoraciones/valoraciones.service';
import {
  CreateValoracionDto,
  UpdateValoracionDto,
} from '../../../dto/valoracion.dto';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('valoraciones')
@ApiTags('valoraciones')
export class ValoracionesController {
  constructor(private valoracionService: ValoracionesService) {}

  @Get()
  @ApiOperation({ summary: 'List of valoraciones' })
  findAll() {
    return this.valoracionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'return one item' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.valoracionService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateValoracionDto) {
    return this.valoracionService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateValoracionDto,
  ): any {
    return this.valoracionService.update(+id, body);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.valoracionService.delete(id);
  }
}
