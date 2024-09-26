import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgreConfigModule } from 'src/config/database/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgreConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('postgres'),
      }),
      inject: [ConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class ProviderPostgreModule {}
