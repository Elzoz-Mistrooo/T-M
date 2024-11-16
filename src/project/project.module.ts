import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { RolesGuard } from '../auth/guard/guard';  // Import the RolesGuard
import { JwtMiddleware } from '../auth/middleware/jwt.middleware';  // Import the JWT middleware
import { PrismaService } from '../prisma/prisma.service'; // Import the Prisma';

@Module({
  controllers: [ProjectController], // Include ProjectController
  providers: [
    ProjectService,               // Include ProjectService
    RolesGuard,                   // Register RolesGuard as a provider
    ,PrismaService,JwtMiddleware,                // Register JwtMiddleware
  ],
})
export class ProjectModule {}
