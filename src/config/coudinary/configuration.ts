import { registerAs } from '@nestjs/config';

export default registerAs('cloudinary', () => ({
  name: process.env.CD_NAME,
  api_key: process.env.CD_API_KEY,
  secret: process.env.CD_SECRET,
}));
