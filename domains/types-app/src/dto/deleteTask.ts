import { IsString } from 'class-validator';

export class DeleteTaskInput {
  @IsString()
  taskId!: string;
}
