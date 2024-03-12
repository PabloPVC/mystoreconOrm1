import { IsNotEmpty, IsString } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
export class CreateBranDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  readonly estado: boolean;
}

export class UpdateBranDto extends PartialType(
  OmitType(CreateBranDto, ['estado']),
) {}
