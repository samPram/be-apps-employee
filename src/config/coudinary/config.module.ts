import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        CD_NAME: Joi.string(),
        CD_API_KEY: Joi.string(),
        CD_SECRET: Joi.string(),
      }),
    }),
  ],
})
export class CloudinaryConfigModule {}
