import { IsNotEmpty, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  readonly identificacion: string;

  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  readonly image: string;
}

export class UpdateCustomerDto extends PartialType(
  OmitType(CreateCustomerDto, ['image']),
) {}
