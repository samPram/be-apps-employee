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
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update.dto';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';

@Controller('employee')
@UseInterceptors(ResponseInterceptor)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Get
  @Get()
  async getAll(@Query() query: any) {
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
}
