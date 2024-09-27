import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { UpdateEmployeeDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { QueryDto } from './dto/query.dto';
import { parse } from 'csv-parse';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  //   find all
  async findAll(options: QueryDto) {
    try {
      const query_builder =
        this.employeeRepository.createQueryBuilder('employee');

      if (options.search) {
        query_builder.where(`employee.name iLIKE :search`, {
          search: `%${options.search}%`,
        });
      }

      if (options.column && options.order) {
        query_builder.orderBy(options.column, options.order);
      }

      const [data, count] = await query_builder
        .skip((options.page - 1) * options.limit)
        .take(options.limit)
        .getManyAndCount();

      const totalPages = Math.ceil(count / options.limit);

      return {
        items: data,
        totalItems: count,
        currentPage: options?.page,
        totalPages,
      };
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

  //   insert from csv
  async insertFromCsv(file: Express.Multer.File) {
    try {
      const fails: any[] = [];
      const inserted: any[] = [];
      const data_parser: any[] = await new Promise((resolve, reject) => {
        parse(file.buffer, { columns: true }, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      for (const element of data_parser) {
        const exist = await this.employeeRepository.findOne({
          where: { number: element?.nomor },
        });

        if (!exist) {
          await this.employeeRepository.insert({
            name: element?.nama,
            number: element?.nomor,
            position: element.jabatan,
            department: element?.departmen,
            joined: element?.tanggal_masuk,
            photo: element?.foto,
            status: element?.status,
          });

          inserted.push(element);
        } else {
          fails.push(element);
        }
      }

      return {
        inserted: { data: inserted, count: inserted.length },
        existing: { data: fails, count: fails.length },
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //   export pdf
  async exportPdf(): Promise<Buffer> {
    try {
      const data = await this.employeeRepository.find();

      const pdf_buffer: Buffer = await new Promise((resolve) => {
        const doc = new PDFDocument({
          size: 'LETTER',
          bufferPages: true,
        });

        doc.text(`Data Employee`, { align: 'center' });
        // content
        for (const emp of data) {
          doc.text(`Nomor: ${emp.number}`, { align: 'left' });
          doc.text(`Nama: ${emp.name}`, { align: 'left' });
          doc.text(`Jabatan: ${emp.position}`, { align: 'left' });
          doc.text(`Depratmen: ${emp.department}`, { align: 'left' });
          doc.text(`Tanggal Masuk: ${emp.joined}`, { align: 'left' });
          doc.text(`Foto: ${emp.photo}`, { align: 'left' });
          doc.text(`Status: ${emp.status}`, { align: 'left' });

          doc.text('\n').moveDown();
        }

        doc.end();

        const buffer = [];
        doc.on('data', buffer.push.bind(buffer));
        doc.on('end', () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        });
      });

      return pdf_buffer;
    } catch (error) {
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // export csv
  async exportCsv(): Promise<string> {
    try {
      const data = await this.employeeRepository.find();

      let csv_string =
        [
          'nama',
          'nomor',
          'jabatan',
          'departmen',
          'tanggal_masuk',
          'foto',
          'status',
        ].join(',') + '\r\n';

      for (const emp of data) {
        csv_string +=
          [
            emp.name,
            emp.number,
            emp.position,
            emp.department,
            emp.joined,
            emp.photo,
            emp.status,
          ].join(',') + '\r\n';
      }

      return csv_string;
    } catch (error) {
      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
