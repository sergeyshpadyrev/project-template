import { IsString } from 'class-validator';

export class DeleteProjectInput {
  @IsString()
  projectId!: string;
}
