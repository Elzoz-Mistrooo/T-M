 import { PartialType } from '@nestjs/mapped-types';
  
  export class CreateTaskDto {
    title: string;
    description: string;
    projectId: number;
    assignedTo: number;
    dueDate: Date;
    createdBy: string;
  }
  
  // update-task.dto.ts
 
  export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    status?: string;
  }
  