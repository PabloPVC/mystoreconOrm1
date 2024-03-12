import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'the nombre of the Location' })
  public name: string;
}
