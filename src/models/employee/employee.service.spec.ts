import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { TypeORMPgTestingModule } from 'test/connection/connection';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employeeRepo: Repository<EmployeeEntity>;

  const mockRepo = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(EmployeeEntity),
          useValue: mockRepo,
        },
        ,
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    employeeRepo = module.get<Repository<EmployeeEntity>>(
      getRepositoryToken(EmployeeEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // get all
  describe('find', () => {
    it('should return an array of employee', async () => {
      const result = [
        {
          id: '7f81f341-bd62-4c8c-a403-8c1cad076223',
          name: 'Aldin',
          number: 999999992,
          position: 'Backend Developer',
          department: 'Tech',
          joined: '2024-09-01',
          photo:
            'http://res.cloudinary.com/dcu3g72ss/image/upload/v1727371297/a5wlgp4rm1uqviggognj.jpg',
          status: 'tetap',
          created_at: '2024-09-27T03:11:40.455Z',
          updated_at: '2024-09-27T03:11:40.455Z',
          deleted_at: null,
        },
        {
          id: 'ac177771-622c-4086-88d0-fa9a4fbb00c2',
          name: 'Brenda Moore',
          number: 50469162,
          position: 'Social Media Manager',
          department: 'Marketing',
          joined: '2022-12-10',
          photo:
            'https://i.pravatar.cc/150?u=72585967-2908-4fc4-9525-3e01bac52b77',
          status: 'kontrak',
          created_at: '2024-09-27T03:11:40.499Z',
          updated_at: '2024-09-27T03:11:40.499Z',
          deleted_at: null,
        },
        {
          id: '1a4c4026-1c81-41d7-9533-9c31f16aab79',
          name: 'Valerie Marquez',
          number: 92610721,
          position: 'UI/UX Designer',
          department: 'Tech',
          joined: '2020-09-27',
          photo:
            'https://i.pravatar.cc/150?u=a29038b1-18be-4e6f-af2f-d4322752177c',
          status: 'tetap',
          created_at: '2024-09-27T03:11:40.526Z',
          updated_at: '2024-09-27T03:11:40.526Z',
          deleted_at: null,
        },
        {
          id: 'b0fa4113-ad86-4790-ab9a-60e3edbfbcba',
          name: 'Melanie Carlson',
          number: 1906398,
          position: 'Complaints Handler',
          department: 'Customer Service',
          joined: '2023-10-05',
          photo:
            'https://i.pravatar.cc/150?u=739c5ad7-f4df-49d2-bcfe-8266b9f8de4d',
          status: 'kontrak',
          created_at: '2024-09-27T03:11:40.546Z',
          updated_at: '2024-09-27T03:11:40.546Z',
          deleted_at: null,
        },
      ];
      // jest.spyOn(service, 'findAll').mockImplementation(async () => ({
      //   items: result,
      //   totalItems: 4,
      //   currentPage: '1',
      //   totalPages: 1,
      // }));
      mockRepo.find.mockResolvedValue(result);

      const employees = await service.findAll();

      expect(employees).toEqual({
        items: result,
        totalItems: 4,
        currentPage: '1',
        totalPages: 1,
      });
    });
  });
});
