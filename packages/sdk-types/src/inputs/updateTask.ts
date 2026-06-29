import { IsOptional, IsString } from "class-validator";
import { Task } from "../models/task";


export class UpdateTaskInput {
  @IsString()
  taskId!: string;

   @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  status?: Task['status'];
}

