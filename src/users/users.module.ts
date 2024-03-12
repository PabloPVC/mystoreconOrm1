import { Module } from '@nestjs/common';
import { OrdesController } from './controllers/ordes.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';

import { OrdesService } from './services/ordes.service';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { Customer } from './entities/customer.entity';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './controllers/profile.controller';
import { OrderDetalle } from './entities/order_detalle.entity';
import { JwtModule } from '@nestjs/jwt';

import { MenuController } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { Menu } from './entities/menu.entity';

import { MenuUsuario } from './entities/menu_usuario.entity';
import { EmailsendService } from './services/emails/emailsend.service';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { ResetPasswordController } from './controllers/reset-password.controller';
import { UsersClaves } from './entities/user_clave';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '5m',
          },
        };
      },
    }),
    TypeOrmModule.forFeature([
      User,
      Order,
      Customer,
      Profile,
      OrderDetalle,
      Menu,
      MenuUsuario,
      UsersClaves,
    ]),
  ],
  controllers: [
    OrdesController,
    UsersController,
    CustomersController,
    ProfileController,
    MenuController,
    ResetPasswordController,
  ],
  providers: [
    OrdesService,
    CustomersService,
    ProfileService,
    MenuService,
    EmailsendService,
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
