import { IsString, IsInt, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  managerId: number;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  employeeIds?: number[];
  
}

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  employeeIds?: number[];
}
