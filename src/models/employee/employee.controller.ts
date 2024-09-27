import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update.dto';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../providers/cloudinary/cloudinary.service';
import { QueryDto } from './dto/query.dto';
import { Response } from 'express';

@Controller('employee')
@UseInterceptors(ResponseInterceptor)
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // Get
  @Get()
  async getAll(@Query() query: QueryDto) {
    if (!query.page || !query.limit) {
      query['page'] = 1;
      query['limit'] = 5;
    }

    return await this.employeeService.findAll(query);
  }

  //   Get One by ID
  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.employeeService.findById(id);
  }

  // Post
  @Post()
  @HttpCode(201)
  async post(@Body() data: EmployeeDto) {
    return await this.employeeService.createOne(data);
  }

  //   Update
  @Patch(':id')
  //   @HttpCode(200)
  async patch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateEmployeeDto,
  ) {
    return await this.employeeService.updateById(id, data);
  }

  //   Delete
  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.employeeService.deleteById(id);
  }

  //   Upload image photo
  @Post('/upload/image')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    const upload = await this.cloudinaryService.uploadFile(file);
    return { public_id: upload.public_id, url: upload.url };
  }

  //   Remove Upload image photo
  @Delete('/upload/image/remove/:public_id')
  async removeUploadPhoto(@Param('public_id') public_id: string) {
    return await this.cloudinaryService.removeFile(public_id);
  }

  // Import file csv employee
  @Post('/import/csv')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    return await this.employeeService.insertFromCsv(file);
  }

  // Export PDF
  @Get('/export/pdf')
  async exportPdf(@Res() res: Response) {
    const pdf_buffer = await this.employeeService.exportPdf();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=employee.pdf');
    res.setHeader('Content-Length', 'buffer.length');
    res.send(pdf_buffer);
  }

  // Export CSV
  @Get('/export/csv')
  async exportCsv(@Res() res: Response) {
    const csv_string = await this.employeeService.exportCsv();
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=employee.csv');

    res.send(csv_string);
  }
}
