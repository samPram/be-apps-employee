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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/providers/cloudinary/cloudinary.service';
import { QueryDto } from './dto/query.dto';

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
}
