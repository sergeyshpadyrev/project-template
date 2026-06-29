import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { Task } from "../models/task";

export class CreateTaskInput {
  @IsString()
  projectId!: string;

  @ValidateNested()
  @Type(() => Task)
  task!: Omit<Task, 'id'>;
}