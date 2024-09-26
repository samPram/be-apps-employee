import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './cofiguration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().port().default(4000),
      }),
    }),
  ],
})
export class AppConfigModule {}
