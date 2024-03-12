import { IsNotEmpty, IsString } from 'class-validator';
export class ReStartPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly user: string;
}
