import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  //   find all
  async findAll(options?: any) {
    try {
      const data = await this.employeeRepository.find();

      return data;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // find by id
  async findById(id: string) {
    try {
      const data = await this.employeeRepository.findOneOrFail({
        where: { id: id },
      });

      return data;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // create one
  async createOne(data: EmployeeDto) {
    try {
      const new_employee = await this.employeeRepository.insert(data);

      return new_employee.identifiers;
    } catch (error) {
      console.log(error);
      if (error instanceof QueryFailedError) {
        const this_error: any = error;
        if (this_error?.code === '23505') {
          throw new HttpException(
            `Duplicate number of employee`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // update by id
  async updateById(id: string, body: UpdateEmployeeDto) {
    try {
      const data = await this.employeeRepository.findOne({ where: { id } });

      if (!data) {
        throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);
      }

      await this.employeeRepository.update(id, body);

      return { id: id };
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //   delete by id
  async deleteById(id: string) {
    try {
      const data = await this.employeeRepository.findOne({ where: { id } });

      if (!data) {
        throw new HttpException('Data not found!', HttpStatus.NOT_FOUND);
      }

      await this.employeeRepository.delete(id);

      return `Deleted ${id}`;
    } catch (error) {
      console.log(error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
