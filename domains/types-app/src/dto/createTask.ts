import { TaskStatus } from '@repo/types';
import { IsEnum, IsString } from 'class-validator';

export class CreateTaskInput {
  @IsString()
  description!: string;

  @IsString()
  name!: string;

  @IsString()
  projectId!: string;

  @IsEnum(TaskStatus)
  status!: TaskStatus;
}
