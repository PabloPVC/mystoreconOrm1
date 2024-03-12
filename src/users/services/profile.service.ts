import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { CreateProfileDto, UpdateProfileDto } from '../dto/profile.dtos';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';

export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly proflieRepository: Repository<Profile>,
  ) {}

  async findAll(): Promise<Profile[]> {
    return await this.proflieRepository.find();
  }
  async findOne(id: number) {
    const profile = await this.proflieRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`Profile con id: ${id} no existe`);
    }
    return profile;
  }
  async create(payload: CreateProfileDto) {
    const newProfile = this.proflieRepository.create({ ...payload });
    return this.proflieRepository.save(newProfile);
  }
  async update(id: number, payload: UpdateProfileDto) {
    const profile = await this.proflieRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`Profile con id: ${id} no existe`);
    }
    this.proflieRepository.merge(profile, payload);
    return this.proflieRepository.save(profile);
  }
  async remove(id: number) {
    const profile = await this.proflieRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`Profile con id: ${id} no existe`);
    }
    return await this.proflieRepository.softRemove(profile);
  }
}
