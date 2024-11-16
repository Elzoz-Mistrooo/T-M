import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from '../auth/dto/task.dto';
import { UpdateTaskDto } from '../auth/dto/task.dto';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAllForUser(userId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { assignedTo: userId } as FindOptionsWhere<Task> });
  }

  async findManagerTasks(managerId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { createdBy: managerId } as FindOptionsWhere<Task> });
  }

  async findOne(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: +taskId } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(taskId, updateTaskDto);
    return this.findOne(taskId);
  }

  async remove(taskId: string): Promise<void> {
    const result = await this.taskRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async getCountForUser(userId: string): Promise<number> {
    return await this.taskRepository.count({ where: { assignedTo: userId } as FindOptionsWhere<Task> });
  }

  async changeTaskStatus(taskId: string, status: string): Promise<Task> {
    const task = await this.findOne(taskId);
    task.status = status;
    return await this.taskRepository.save(task);
  }

  async findProjectTasks(projectId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { projectId } as FindOptionsWhere<Task> });
  }
}