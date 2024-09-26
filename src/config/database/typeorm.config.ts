import DbConfig from './configuration';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` }); // very very important!!
const typeormConfig = DbConfig() as DataSourceOptions;
export default new DataSource(typeormConfig);
