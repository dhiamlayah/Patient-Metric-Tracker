import { registerAs } from '@nestjs/config';

export default registerAs('env', () => ({
  pgHost: process.env.PG_HOST || 'localhost',
  pgPort: 5432,
  pgUser: process.env.PG_USER || 'user',
  pgPassword: process.env.PG_PASSWORD || 'password',
  pgDatabase: process.env.PG_DATABASE || 'database',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: 6379,
}));
