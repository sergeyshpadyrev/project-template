import { IsString } from "class-validator";

export class UpdateProjectInput {
  @IsString()
  projectId!: string;

  @IsString()
  name!: string;
}
