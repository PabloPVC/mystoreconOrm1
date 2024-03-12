import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OrderDetalle } from './../../users/entities/order_detalle.entity';
import { Product } from './../../products/entities/product.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly numero_fac: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly fecha_orden: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly total: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly descuento: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly estado: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly customer_id: number;

  /*@IsNotEmpty()
  readonly detalles: OrderDetalle[];*/
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['numero_fac']),
) {}

export class CreateOrderDetalleDto {
  @IsNotEmpty()
  @IsNumber()
  readonly order_id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  readonly precio_unitario: number;

  @IsNotEmpty()
  @IsNumber()
  readonly producto_id: number;
}
