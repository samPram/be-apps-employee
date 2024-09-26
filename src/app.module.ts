import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './models/employee/employee.module';
import { ProviderPostgreModule } from './providers/database/postgre/postgre.module';
import { AppConfigModule } from './config/app/config.module';
import { PostgreConfigModule } from './config/database/config.module';

@Module({
  imports: [
    //  Config
    AppConfigModule,
    PostgreConfigModule,
    // Provider
    ProviderPostgreModule,
    // Models
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
