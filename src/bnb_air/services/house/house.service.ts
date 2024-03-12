import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { House } from '../../models/house.model';
import { Image } from '../../models/images.model';
import { Valoracion_House } from './../../models/valoracion_house.model';
import { Valoracion } from '../../models/valoracion.model';
import { CreateHouseDto } from '../../dto/house.dto';
import { LocationOfrece } from '../../models/location-ofrece.model';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    @InjectRepository(LocationOfrece)
    private readonly locationRepository: Repository<LocationOfrece>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Valoracion_House)
    private readonly valoracionRepository: Repository<Valoracion_House>,
    @InjectRepository(Valoracion)
    private readonly valorRepository: Repository<Valoracion>,
  ) {}

  async findAll() {
    return this.houseRepository.find({
      relations: ['valoraciones', 'images', 'locationOfrece'],
    });
  }
  async findOne(id: number) {
    const house = await this.houseRepository.findOne({
      where: { id: id },
    });
    if (!house) {
      throw new NotFoundException(`House con id: ${id} no existe.`);
    }
    return house;
  }

  async create(payload: CreateHouseDto) {
    console.log('***payload****', payload);
    const newHuose = this.houseRepository.create({ ...payload });
    const houseSave = await this.houseRepository.save(newHuose);

    payload.images.map((item) => {
      const image = new Image();
      image.title = item.title;
      image.itemImageSrc = item.itemImageSrc;
      image.thumbmailImageSrc = item.thumbmailImageSrc;
      image.altSrc = item.altSrc;
      image.house = houseSave;
      return this.imageRepository.save(image);
    });
    /*payload.location.map((item) => {
      const location = new LocationOfrece();
      location.name = item.name;
      location.house = houseSave;
      return this.locationRepository.save(location);
    });*/

    /*payload.valoracion.map(async (item) => {
      const valor = new Valoracion_House();
      const valoracion = await this.valorRepository.findOne({
        where: { id: item.valoracion_id },
      });
      if (!valoracion) {
        throw new NotFoundException(
          `Valoración con id: ${item.valoracion_id} no existe`,
        );
      }
      valor.valoracion = valoracion;
      valor.house = houseSave;
      return this.valoracionRepository.save(valor);
    });*/
    return houseSave;
  }

  async update(id: number, updateHouseDto: CreateHouseDto): Promise<House> {
    const house = await this.findOne(id);
    if (!house) {
      throw new NotFoundException(`House con id: ${id} no existe.`);
    }
    Object.assign(house, updateHouseDto);
    return await this.houseRepository.save(house);
  }

  async delete(id: number): Promise<void> {
    const house = await this.findOne(id);
    await this.houseRepository.softRemove(house);
  }
}
