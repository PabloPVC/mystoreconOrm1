import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the nombre of user' })
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the password of user' })
  readonly password: string;

  @IsNotEmpty()
  readonly estado: boolean;

  @IsNotEmpty()
  readonly image: string;

  @IsInt()
  @IsPositive()
  readonly profile_id: number;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['estado', 'image']),
) {}
