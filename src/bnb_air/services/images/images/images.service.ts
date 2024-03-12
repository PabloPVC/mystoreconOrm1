import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto, UpdateImageDto } from '../../../dto/image.dto';
import { Image } from '../../../models/images.model';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findAll() {
    return this.imageRepository.find();
  }

  async findOne(id: number) {
    const img = await this.imageRepository.findOne({
      where: { id: id },
    });
    if (!img) {
      throw new NotFoundException(`Imagen con id: ${id} no existe.`);
    }
    return img;
  }
  async create(payload: CreateImageDto) {
    console.log('***payload****', payload);
    const newImagen = this.imageRepository.create({ ...payload });
    const imagenSave = await this.imageRepository.save(newImagen);
    return imagenSave;
  }
  async update(
    id: number,
    updateValoracionDto: UpdateImageDto,
  ): Promise<Image> {
    const valoracion = await this.findOne(id);
    Object.assign(valoracion, updateValoracionDto);
    return await this.imageRepository.save(valoracion);
  }
  async delete(id: number): Promise<void> {
    const valoracion = await this.findOne(id);
    await this.imageRepository.softRemove(valoracion);
  }
}
