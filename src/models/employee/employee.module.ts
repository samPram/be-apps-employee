import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from './entity/employee.entity';
import { CloudinaryProviderModule } from 'src/providers/cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryProviderModule,
    TypeOrmModule.forFeature([EmployeeEntity]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
