import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeORMPgTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_HOST) || 5432,
    username: process.env.PG_USERNAME || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
    database: process.env.PG_DATABASE || 'db_employee_test',
    entities: [...entities],
    synchronize: true,
  });
