import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';

export class CreateValoracionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the titulo of the valoracion' })
  title: string;

  @IsNumber()
  @ApiProperty({ description: 'the valor of the valoracion' })
  valor: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the icon of the valoracion' })
  icon: string;
}

export class UpdateValoracionDto extends PartialType(
  OmitType(CreateValoracionDto, []),
) {}
