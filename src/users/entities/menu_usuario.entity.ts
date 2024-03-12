import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Menu } from './menu.entity';
import { User } from './user.entity';

@Entity('menu_usuario')
export class MenuUsuario {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @ManyToOne(() => Menu, (menu) => menu.menus_users, {
    eager: true,
  })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;
  @ManyToOne(() => User, (user) => user.menus)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column()
  estado: boolean;
}
