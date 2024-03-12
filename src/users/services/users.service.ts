import { InjectRepository } from '@nestjs/typeorm';
import {
  HttpException,
  Injectable,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dtos';
import { Repository } from 'typeorm';
import { EmailsendService } from './emails/emailsend.service';
import { PayloadToken } from 'src/auth/models/token.model';
import { JwtService } from '@nestjs/jwt';
import { generarCodigo } from './generar-password';
import { UpdatePasswordDto } from '../dto/update_password';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { ReStartPasswordDto } from '../dto/re_start_password';
import { UsersClaves } from '../entities/user_clave';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly sendPasswordMail: EmailsendService,
    private jwtService: JwtService,
    @InjectRepository(UsersClaves)
    private readonly userClaveRepositori: Repository<UsersClaves>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['profile'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { profile: true, menus: true },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no existe`);
    }
    return user;
  }
  async create(payload: CreateUserDto) {
    const { profile_id } = payload;
    const newUser = this.userRepository.create({ ...payload });
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const profile = await this.profileRepository.findOneBy({ id: profile_id });
    if (!profile) {
      throw new NotFoundException(`Profile con id: ${profile_id} no existe`);
    }
    newUser.profile = profile;
    return await this.userRepository.save(newUser);
  }
  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { nombre: email },
      relations: { profile: true, menus: true },
    });
  }
  async update(id: number, payload: UpdateUserDto) {
    const { profile_id } = payload;
    const profile = await this.profileRepository.findOneBy({ id: profile_id });
    if (!profile) {
      throw new NotFoundException(`Profile con id: ${profile_id} no existe`);
    }
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no existe`);
    }
    user.profile = profile;
    return this.userRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no existe`);
    }
    return await this.userRepository.softRemove(user);
  }
  async reseteoPassword(body: ReStartPasswordDto) {
    const { user } = body;
    const userExiste = await this.userRepository.findOne({
      where: {
        nombre: user,
      },
      relations: { profile: true },
    });
    if (!userExiste) {
      throw new NotFoundException(`Usuario con email: ${user} no existe`);
    }
    try {
      const payload: PayloadToken = {
        profile: userExiste.profile.nombre,
        sub: userExiste.id,
      };
      const token = this.jwtService.sign(payload);
      const envio = await this.sendPasswordMail.sendForgotPasswordMail(
        user,
        token,
      );

      if (envio) {
        return {
          statusCode: 200,
          data: 'Correo de recuperación enviado',
        };
      } else {
        return {
          statusCode: 501,
          data: envio,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: error,
      };
    }
  }
  async reseteoPasswordMovil(body: ReStartPasswordDto) {
    const { user } = body;
    const userExiste = await this.userRepository.findOne({
      where: {
        nombre: user,
      },
      relations: { profile: true },
    });
    if (!userExiste) {
      throw new NotFoundException(`Usuario con email: ${user} no existe`);
    }
    try {
      const codigoSeguro = generarCodigo();
      const user_claves_found = await this.userClaveRepositori.find({
        where: {
          email: user,
          estado: 0,
        },
      });
      if (user_claves_found.length > 0) {
        user_claves_found.forEach((user) => {
          user.estado = 1;
          user.update_proceso = new Date();
          this.userClaveRepositori.save(user);
        });
      }

      const user_clave = this.userClaveRepositori.create({});
      user_clave.fecha_proceso = new Date();
      user_clave.email = user;
      user_clave.clave = codigoSeguro;
      user_clave.estado = 0;
      await this.userClaveRepositori.save(user_clave);
      await this.sendPasswordMail
        .sendForgotPasswordMailMovil(user, codigoSeguro)
        .then(() => {
          console.log('entra por verdad');
          return {
            statusCode: 200,
            data: 'Correo de recuperación enviado',
          };
        })
        .catch((error) => {
          console.log('****primer error****');
          throw new HttpException(
            `No se encontró envio el correo ${error}`,
            HttpStatus.BAD_REQUEST,
          );
        });
    } catch (error) {
      throw new HttpException(` ${error}`, HttpStatus.BAD_REQUEST);
    }
  }
  async reseteoPasswordUser(body: UpdatePasswordDto) {
    const { user, password, codigoSegure } = body;
    const userExiste = await this.userRepository.findOne({
      where: {
        nombre: user,
      },
    });
    if (!userExiste) {
      throw new NotFoundException(`Usuario con email: ${user} no existe`);
    }
    try {
      const user_claves_found = await this.userClaveRepositori.findOne({
        where: {
          email: user,
          estado: 0,
        },
      });
      if (user_claves_found.clave !== codigoSegure) {
        throw new HttpException(
          'El codigó de seguridad no es correcto',
          HttpStatus.BAD_REQUEST,
        );
      }
      user_claves_found.update_proceso = new Date();
      user_claves_found.estado = 1;
      this.userClaveRepositori.save(user_claves_found);

      const hashPassword = await bcrypt.hash(password, 10);
      userExiste.password = hashPassword;
      await this.userRepository.save(userExiste);
      return {
        statusCode: 200,
        data: 'clave cambiado con exito',
      };
    } catch (error) {
      return {
        statusCode: 500,
        data: error,
      };
    }
  }
}
