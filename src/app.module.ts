import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './models/employee/employee.module';
import { PostgreModule } from './providers/database/postgre/postgre.module';

@Module({
  imports: [EmployeeModule, PostgreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
