import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { OmitType } from '@nestjs/mapped-types';

export class CreateImageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the titulo of the image' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the src of the image' })
  itemImageSrc: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the src of the thumbmail image' })
  thumbmailImageSrc: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the alt of the image' })
  altSrc: string;
}

export class UpdateImageDto extends PartialType(OmitType(CreateImageDto, [])) {}
