import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationOfrece } from '../../models/location-ofrece.model';
import { CreateLocationDto } from '../../dto/location.tdo';
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationOfrece)
    private readonly locationRepository: Repository<LocationOfrece>,
  ) {}
  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    const valoracion = await this.locationRepository.findOne({
      where: { id: id },
    });
    if (!valoracion) {
      throw new NotFoundException(`Locación con id: ${id} no existe.`);
    }
    return valoracion;
  }

  async create(payload: CreateLocationDto) {
    console.log('***CreateValoracionDto payload****', payload);
    const newValoracion = this.locationRepository.create({ ...payload });
    const valoracionSave = await this.locationRepository.save(newValoracion);
    return valoracionSave;
  }
  async update(
    id: number,
    updateLocationDto: CreateLocationDto,
  ): Promise<LocationOfrece> {
    const location = await this.findOne(id);
    Object.assign(location, updateLocationDto);
    return await this.locationRepository.save(location);
  }
  async delete(id: number): Promise<void> {
    const valoracion = await this.findOne(id);
    await this.locationRepository.softRemove(valoracion);
  }
}
