import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { ReStartPasswordDto } from '../dto/re_start_password';
import { UpdatePasswordDto } from '../dto/update_password';

@Controller('reset-password')
@ApiTags('reset-password')
export class ResetPasswordController {
  constructor(private usersService: UsersService) {}

  @Post('resetearPassword')
  reseteoPassword(@Body() body: ReStartPasswordDto) {
    return this.usersService
      .reseteoPassword(body)
      .then(() => {
        return {
          statusCode: 201,
          data: 'Correo de recuperación enviado',
        };
      })
      .catch((error) => {
        return {
          statusCode: 500,
          data: error,
        };
      });
  }
  @Post('resetearPassword-movil')
  reseteoPasswordMovil(@Body() body: ReStartPasswordDto) {
    return this.usersService
      .reseteoPasswordMovil(body)
      .then(() => {
        return {
          statusCode: 201,
          data: 'Correo de recuperación enviado',
        };
      })
      .catch((error) => {
        throw new HttpException(
          `Error no se envio el correo: ${error}`,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
  @Post('update-password')
  updatePassword(@Body() body: UpdatePasswordDto) {
    console.log('**update-password**');
    return this.usersService
      .reseteoPasswordUser(body)
      .then(() => {
        return {
          statusCode: 200,
          data: 'Cambio de password realizado con exíto',
        };
      })
      .catch((error) => {
        return {
          statusCode: 500,
          data: error,
        };
      });
  }
}
