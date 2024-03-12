import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateValoracionUserDto {
  @IsInt()
  @ApiProperty({ description: 'the id of the valoracion' })
  valoracion_id: number;
}
