import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Valoracion } from '../../../models/valoracion.model';
import {
  CreateValoracionDto,
  UpdateValoracionDto,
} from '../../../dto/valoracion.dto';

@Injectable()
export class ValoracionesService {
  constructor(
    @InjectRepository(Valoracion)
    private readonly valoracionRepository: Repository<Valoracion>,
  ) {}

  async findAll() {
    return await this.valoracionRepository.find();
  }

  async findOne(id: number) {
    const valoracion = await this.valoracionRepository.findOne({
      where: { id: id },
    });
    if (!valoracion) {
      throw new NotFoundException(`Valoración con id: ${id} no existe.`);
    }
    return valoracion;
  }

  async create(payload: CreateValoracionDto) {
    console.log('***CreateValoracionDto payload****', payload);
    const newValoracion = this.valoracionRepository.create({ ...payload });
    const valoracionSave = await this.valoracionRepository.save(newValoracion);
    return valoracionSave;
  }
  async update(
    id: number,
    updateValoracionDto: UpdateValoracionDto,
  ): Promise<Valoracion> {
    const valoracion = await this.findOne(id);
    Object.assign(valoracion, updateValoracionDto);
    return await this.valoracionRepository.save(valoracion);
  }
  async delete(id: number): Promise<void> {
    const valoracion = await this.findOne(id);
    await this.valoracionRepository.softRemove(valoracion);
  }
}
