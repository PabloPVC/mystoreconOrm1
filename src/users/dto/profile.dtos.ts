import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'El nombre del usuario' })
  readonly nombre: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'El estado del usuario activo/inactivo' })
  readonly estado: boolean;
}

export class UpdateProfileDto extends PartialType(
  OmitType(CreateProfileDto, []),
) {}
