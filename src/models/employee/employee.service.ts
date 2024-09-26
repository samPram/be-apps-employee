import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  //   find all
  async findAll(options?: any) {}

  // find by id
  async findById(id: string) {}

  // create one
  async createOne(data: EmployeeDto) {
    try {
      const new_employee = await this.employeeRepository.insert(data);

      return new_employee.identifiers;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // update by id
  async updateById(id: string, data: UpdateEmployeeDto) {}

  //   delete by id
  async deleteById(id: string) {}
}
