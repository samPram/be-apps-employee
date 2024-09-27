import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
}));
