import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the nombre of Product' })
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the description of Product' })
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'the precio_unitario of Product' })
  readonly precio_unitario: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'the url imagen of Product' })
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'the stock of Product' })
  readonly stock: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'the estado of Product' })
  readonly estado: boolean;

  @IsNotEmpty()
  readonly categorie_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'the marca of Product' })
  readonly brand_id: number;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['image']),
) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
