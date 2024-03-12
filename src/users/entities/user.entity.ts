import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { MenuUsuario } from './menu_usuario.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column({ type: 'varchar', width: 200, unique: true })
  nombre: string;
  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string; // encript
  @Column()
  image: string;
  @Column()
  estado: boolean;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @OneToMany(() => MenuUsuario, (menu_usuario) => menu_usuario.user)
  menus: MenuUsuario[];
}
