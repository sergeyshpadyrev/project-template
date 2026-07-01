import { IsString } from "class-validator";

export class UpdateProjectInput {
  @IsString()
  name!: string;

  @IsString()
  projectId!: string;
}
