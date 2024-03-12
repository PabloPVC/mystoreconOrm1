import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'my_store',
  logging: true,
  synchronize: false,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/mysql/migrations/*.ts'],
  migrationsTableName: 'migrations',
};
const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
