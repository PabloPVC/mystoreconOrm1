import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLocationDto } from './location.tdo';
import { Type } from 'class-transformer';
import { CreateImageDto } from './image.dto';
import { CreateValoracionUserDto } from './valoracion_user.dto';

export class CreateHouseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the nombre of the house' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the ciudad where ubication house' })
  readonly ciudad: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the longitud of house' })
  readonly longitud: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the latitud of house' })
  readonly latitud: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'the url imagen of house' })
  readonly foto: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'the status of the house' })
  readonly estado: number;

  /*@IsNotEmpty()
  @ApiProperty({ description: 'Valoración de la casa of the house' })
  @Type(() => CreateValoracionUserDto)
  readonly valoracion: CreateValoracionUserDto[];

  @IsNotEmpty()
  @ApiProperty({ description: 'what ofrece the house' })
  @Type(() => CreateLocationDto)
  readonly location: CreateLocationDto[];*/

  @IsNotEmpty()
  @ApiProperty({ description: 'Imagenes of the house' })
  @Type(() => CreateImageDto)
  readonly images: CreateImageDto[];
}
