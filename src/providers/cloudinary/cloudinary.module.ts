import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CloudinaryConfigModule } from 'src/config/coudinary/config.module';
import { CloudinaryService } from './cloudinary.service';

const CloudinaryProvider = {
  provide: 'Cloudinary',
  import: [CloudinaryConfigModule],
  useFactory: (configService: ConfigService) => {
    return v2.config({
      cloud_name: configService.get<string>('cloudinary.name'),
      api_key: configService.get<string>('cloudinary.api_key'),
      api_secret: configService.get<string>('cloudinary.secret'),
    });
  },
  inject: [ConfigService],
};

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryProviderModule {}
