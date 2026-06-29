import { Type } from "class-transformer";
import { IsEnum, IsString, ValidateNested } from "class-validator";
import { Task, TaskStatus } from "../models/task";

export class CreateTaskInput {
  @IsString()
  projectId!: string;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(TaskStatus)
  status!: TaskStatus;
}