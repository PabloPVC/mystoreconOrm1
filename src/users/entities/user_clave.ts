import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_claves')
export class UsersClaves {
  @PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS' })
  id: number;
  @Column({ type: 'varchar', width: 10 })
  clave: string;
  @Column({ type: 'varchar', width: 200 })
  email: string;
  @Column({ type: 'timestamp' })
  fecha_proceso: Date;
  @Column({ nullable: true })
  update_proceso: Date;
  @Column({ default: 0 })
  estado: number;
}
