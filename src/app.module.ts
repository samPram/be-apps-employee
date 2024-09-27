import { Module } from '@nestjs/common';
import { EmployeeModule } from './models/employee/employee.module';
import { ProviderPostgreModule } from './providers/database/postgre/postgre.module';
import { AppConfigModule } from './config/app/config.module';
import { PostgreConfigModule } from './config/database/config.module';
import { CloudinaryProviderModule } from './providers/cloudinary/cloudinary.module';
import { CloudinaryConfigModule } from './config/coudinary/config.module';

@Module({
  imports: [
    //  Config
    AppConfigModule,
    PostgreConfigModule,
    CloudinaryConfigModule,
    // Provider
    ProviderPostgreModule,
    CloudinaryProviderModule,
    // Models
    EmployeeModule,
  ],
})
export class AppModule {}
