import { IsString } from "class-validator";

export class GetTasksInput {
  @IsString()
  projectId!: string;
}