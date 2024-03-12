import { IsNotEmpty, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';

export class CreateCategorieDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  readonly estado: boolean;
}

export class UpdateCategorieDto extends PartialType(
  OmitType(CreateCategorieDto, ['estado']),
) {}
