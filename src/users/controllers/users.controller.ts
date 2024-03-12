import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Body,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';

import { CreateUserDto, UpdateUserDto } from '../dto/user.dtos';
import { ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ReStartPasswordDto } from '../dto/re_start_password';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @Get()
  getUsers(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.usersService.findAll();
  }
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
  @Put(':id')
  updateUsers(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): any {
    console.log('*****');
    return this.usersService.update(id, body);
  }
  @Delete(':id')
  deleteUsers(@Param('id', ParseIntPipe) id: number): any {
    return this.usersService.remove(id);
  }

  @Post('imagenProfile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dynamicPath = path.join('./uploads/profile');
          if (!fs.existsSync(dynamicPath)) {
            fs.mkdirSync(dynamicPath, { recursive: true }); // Crea el directorio si no existe
          }
          cb(null, dynamicPath);
        },
        filename: async (req, file, cb) => {
          // Define cómo deseas nombrar los archivos (por ejemplo, usando el nombre original)
          const nombreFile = Date.now() + '.png';
          cb(null, nombreFile);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      statusCode: 200,
      data: file.path,
    };
  }
}
