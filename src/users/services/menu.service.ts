import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDtos, UpdateMenuDto } from '../dto/menu.dtos';
import { Repository } from 'typeorm';
import { Menu } from '../entities/menu.entity';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      relations: ['profile'],
    });
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({
      where: { id: id },
      relations: ['profile'],
    });
    if (!menu) {
      throw new NotFoundException(`Menu con id: ${id} no existe`);
    }
    return menu;
  }

  async create(payload: CreateMenuDtos) {
    const { profile_id } = payload;
    const newmenu = this.menuRepository.create({ ...payload });
    const profile = await this.profileRepository.findOneBy({ id: profile_id });
    if (!profile) {
      throw new NotFoundException(`Profile con id: ${profile_id} no existe`);
    }
    newmenu.profile = profile;
    return await this.profileRepository.save(newmenu);
  }

  async update(id: number, payload: UpdateMenuDto) {
    const { profile_id } = payload;
    const profile = await this.profileRepository.findOneBy({ id: profile_id });
    if (!profile) {
      throw new NotFoundException(`Profile con id: ${profile_id} no existe`);
    }
    const menu = await this.menuRepository.findOneBy({ id });
    if (!menu) {
      throw new NotFoundException(`Menu con id: ${id} no existe`);
    }
    menu.profile = profile;
    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.menuRepository.findOneBy({ id });
    if (!menu) {
      throw new NotFoundException(`Menu con id: ${id} no existe`);
    }
    return await this.menuRepository.softRemove(menu);
  }
}
