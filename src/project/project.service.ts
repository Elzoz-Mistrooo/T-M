import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Assuming you have this Prisma service
import { CreateProjectDto, UpdateProjectDto } from '../auth/dto/Projectmanger-create';  // Import DTOs for type safety

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}  // Inject Prisma service

  // Create a new project
  async createProject(createProjectDto: CreateProjectDto) {
    const newProject = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        managerId: createProjectDto.managerId,
        employees: {
          connect: createProjectDto.employeeIds.map((userId) => ({
            projectId_userId: {
              projectId: Number(createProjectDto.managerId),  // You can use the current project ID
              userId: userId,  // Employee's userId
            },
          })),
        },
      },
    });
    return newProject;
  }
  
  
  
  


  // Get project by ID
  async getProjectById(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  // Update a project by ID
  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const updatedProject = await this.prisma.project.update({
      where: { id: Number(id) },
      data: updateProjectDto,
    });
    return updatedProject;
  }

  // Delete a project by ID
  async deleteProject(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(id) },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.prisma.project.delete({
      where: { id: Number(id) },
    });
    return { message: `Project ${id} deleted successfully` };
  }

  // Get Projects Managed by a Specific Manager
  async getManagerProjects(managerId: number) {
    const managerProjects = await this.prisma.project.findMany({
      where: { managerId },
    });
    if (managerProjects.length === 0) {
      throw new NotFoundException(`No projects found for manager with ID ${managerId}`);
    }
    return managerProjects;
  }

  // Get Projects Assigned to a Specific Employee
  async getEmployeeProjects(employeeId: number) {
    const employeeProjects = await this.prisma.project.findMany({
      where: {
        employees: {
          some: {
            userId: employeeId,  // Use 'userId' to reference the employee ID in the ProjectEmployee join table
          },
        },
      },
    });
    if (employeeProjects.length === 0) {
      throw new NotFoundException(`No projects found for employee with ID ${employeeId}`);
    }
    return employeeProjects;
  }
  

  // Get All Projects
  async getAllProjects() {
    const allProjects = await this.prisma.project.findMany();
    if (allProjects.length === 0) {
      throw new NotFoundException('No projects found');
    }
    return allProjects;
  }
}
