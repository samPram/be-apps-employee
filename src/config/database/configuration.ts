import { registerAs } from '@nestjs/config';
import { DatabaseType } from 'typeorm';

export default registerAs('postgres', () => ({
  type: 'postgres' as DatabaseType,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  database: process.env.PG_DBNAME,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration_table',
  synchronize: true, // don't use when prod
  logging: true,
  cli: {
    migrationsDir: 'src/database/migrations', // This path will be used by typeorm cli when we create a new migration
  },
}));
