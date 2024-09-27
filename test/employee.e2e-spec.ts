import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EmployeeModule } from 'src/models/employee/employee.module';
import { EmployeeService } from 'src/models/employee/employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/models/employee/entity/employee.entity';
import { Repository } from 'typeorm';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  let service: EmployeeService;
  let repo: Repository<EmployeeEntity>;

  const mockEmployeeService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EmployeeModule],
      providers: [
        {
          provide: getRepositoryToken(EmployeeEntity),
          useValue: mockEmployeeService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/employee (GET)', () => {
    return request(app.getHttpServer()).get('/employee').expect(200).expect({
      data: employeeServicee.findAll(),
    });
  });
});
