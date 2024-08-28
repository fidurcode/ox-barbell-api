import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './src/entities/user.entity';
import { configDotenv } from 'dotenv';

configDotenv();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  entities: [User],
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
};

export default config;