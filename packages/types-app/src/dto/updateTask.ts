import { Task } from '@repo/types';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskInput {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  status?: Task['status'];

  @IsString()
  taskId!: string;
}
