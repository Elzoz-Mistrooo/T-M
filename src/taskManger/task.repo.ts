import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findTasksByManager(managerId: number): Promise<Task[]> {
    return this.taskRepository.createQueryBuilder('task')
      .where('task.createdBy = :managerId', { managerId })
      .getMany();
  }

  async findTasksForProject(projectId: number): Promise<Task[]> {
    return this.taskRepository.createQueryBuilder('task')
      .where('task.projectId = :projectId', { projectId })
      .getMany();
  }

  async findTasksForUser(userId: number): Promise<Task[]> {
    return this.taskRepository.createQueryBuilder('task')
      .where('task.assignedTo = :userId', { userId })
      .getMany();
  }
}
