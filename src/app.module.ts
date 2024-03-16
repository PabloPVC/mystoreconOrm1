import { Module } from '@nestjs/common';

import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { Configuration } from './config/config.keys';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { enviroments } from 'enviroments';
import { BnbAirModule } from './bnb_air/bnb_air.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../'),
    }),
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
      logging: Boolean(process.env.TYPEORM_LOGGING),
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    BnbAirModule,
  ],
  controllers: [],
  providers: [],
  exports: [UsersModule, ProductsModule, AuthModule, BnbAirModule],
})
export class AppModule {
  static port: number | string;
  constructor(private readonly _configServices: ConfigService) {
    AppModule.port =
      process.env.PORT || this._configServices.get(Configuration.PORT);
    console.log('***********');
    console.log(AppModule.port);
  }
}
