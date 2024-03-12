import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImagesService } from '../../../services/images/images/images.service';
import { CreateImageDto, UpdateImageDto } from '../../../dto/image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { JwtAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private imageService: ImagesService) {}

  @Get()
  @ApiOperation({ summary: 'List of imagenes' })
  getHouses() {
    return this.imageService.findAll();
  }

  @Post()
  create(@Body() payload: CreateImageDto) {
    return this.imageService.create(payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'return one item' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateImageDto,
  ): any {
    return this.imageService.update(+id, body);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.imageService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1; // Sumar 1 porque los meses son indexados desde 0
          const day = currentDate.getDate();
          const dynamicPath = path.join(
            './uploads/images',
            `${year}/${month}/${day}`,
          );
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
