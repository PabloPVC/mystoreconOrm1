import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../config/config.keys';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        database: config.get(Configuration.DATABASE),
        synchronize: false,
      };
    },
  }),
];
