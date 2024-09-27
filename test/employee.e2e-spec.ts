import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmployeeModule } from '../src/models/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/models/employee/entity/employee.entity';
import { TypeORMPgTestingModule } from './connection/connection';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        EmployeeModule,
        TypeORMPgTestingModule([EmployeeEntity]),
        TypeOrmModule.forFeature([EmployeeEntity]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/employee (GET)', () => {
    return request(app.getHttpServer()).get('/employee').expect(200);
  });
});
