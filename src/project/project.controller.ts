import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { RolesGuard } from '../auth/guard/guard'
import { JwtMiddleware } from '../auth/middleware/jwt.middleware';
import { Roles } from '../auth/decorators/decoratros'; // custom decorator
import { Role } from '../auth/enum/role';
import { ProjectService } from './project.service';
import { Request } from 'express';


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Create Project (Already Implemented)
  @Post()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.MANAGER)
  createProject(@Body() createProjectDto: any) {
    return this.projectService.createProject(createProjectDto);
  }

  // Get Project by ID (Already Implemented)
  @Get(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.MANAGER, Role.EMPLOYEE)
  getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  // Update Project (Already Implemented)
  @Put(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.MANAGER)
  updateProject(@Param('id') id: string, @Body() updateProjectDto: any) {
    return this.projectService.updateProject(id, updateProjectDto);
  }

  // Delete Project (Already Implemented)
  @Delete(':id')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.MANAGER)
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  // Get Manager Projects
  @Get('manager')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.MANAGER)
  getManagerProjects(@Req() req: Request) {
    const managerId = req.user.id;  // Assuming the manager's ID is in the JWT payload
    return this.projectService.getManagerProjects(managerId);
  }

  // Get Employee Projects
  @Get('employee')
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.EMPLOYEE)
  getEmployeeProjects(@Req() req: Request) {
    const employeeId = req.user.id;  // Assuming the employee's ID is in the JWT payload
    return this.projectService.getEmployeeProjects(employeeId);
  }

  // Get All Projects
  @Get()
  @UseGuards(JwtMiddleware, RolesGuard)
  @Roles(Role.MANAGER)
  getAllProjects() {
    return this.projectService.getAllProjects();
  }
}
