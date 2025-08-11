import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

dotenv.config(); //Load enviroment variables from env.

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User],
      synchronize: true, // <--- **CAUTION: USE ONLY IN DEVELOPMENT!**
      //     This automatically creates/updates your database schema based on entities.
      //     **NEVER use in production** as it can lead to data loss.
      //     Use TypeORM Migrations for production schema changes.
      logging: false,
      }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
