import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { Task } from './taskManger/task.entity'; // Import your entity
import { TaskRepository } from './taskManger/task.repository'; // Import your repository
import { RolesGuard } from './auth/guard/guard'; // Your custom RolesGuard
// import { JwtAuthGuard } from './jwt-auth.guard'; // Your custom JwtAuthGuard

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally accessible
    }),

    // JWT module configuration
    JwtModule.register({
      secret: process.env.SECRET, // Use the secret from .env
      signOptions: { expiresIn: '1h' },
    }),

    // TypeORM module configuration
    TypeOrmModule.forRoot({
      type: 'postgres', // Change to your DB type (e.g., 'mysql' or 'sqlite')
      host: 'localhost', // Your DB host
      port: 5432, // Your DB port (PostgreSQL default)
      username: process.env.DB_USERNAME, // Use environment variables
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Task], // Register your entities here
      synchronize: true, // Don't use synchronize: true in production
    }),

    // Register your feature modules (repositories, services, etc.)
    TypeOrmModule.forFeature([TaskRepository]), // Register repository

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Use RolesGuard globally
    },
  ],
})
export class AppModule {}
