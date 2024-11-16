import { Controller, Get, Post, Put, Delete, Param, Body, Req } from '@nestjs/common';
import { Request } from 'express';  // Import Request from express

import { TaskService } from './task.service';
import { CreateTaskDto } from '../auth/dto/task.dto'; // Fixed path
import { UpdateTaskDto } from '../auth/dto/task.dto'; // Fixed path

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create a new task
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const managerId = req.user.id; // Assumes user ID is available
    return this.taskService.create({ ...createTaskDto, createdBy: managerId });
  }

  // Find tasks assigned to the current user
  @Get()
  findAssignedTasks(@Req() req: Request) {
    const userId = req.user.id;
    return this.taskService.findAllForUser(userId);
  }

  // Find tasks managed by the current user (manager)
  @Get('manager')
  findManagerTasks(@Req() req: Request) {
    const managerId = req.user.id;
    return this.taskService.findManagerTasks(managerId);
  }

  // Find a specific task by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  // Update a task by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  // Remove a task by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  // Get the task count for the current user
  @Get('count')
  getCount(@Req() req: Request) {
    const userId = req.user.id;
    return this.taskService.getCountForUser(userId);
  }

  // Change the status of a task
  @Put(':id/change-status')
  changeStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.taskService.changeTaskStatus(id, status);
  }

  // Get tasks for a specific project
  @Get('project/:id')
  getProjectTasks(@Param('id') projectId: string) {
    return this.taskService.findProjectTasks(projectId);
  }
}
