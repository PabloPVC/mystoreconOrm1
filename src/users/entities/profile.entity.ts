import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';
@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column()
  nombre: string;
  @Column()
  estado: boolean;
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(() => User, (user) => user.profile)
  user: User[];
}
