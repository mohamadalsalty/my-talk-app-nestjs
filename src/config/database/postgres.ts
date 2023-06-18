import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CreateCommentsTable1687097922714 } from 'src/migrations/1687097922714-CreateCommentsTable';

export function getDatabaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      
    ],
    synchronize: process.env.DATABASE_SYNC === 'true',
    migrations: [CreateCommentsTable1687097922714],
    migrationsRun: true,
    autoLoadEntities: true,
  };
}
