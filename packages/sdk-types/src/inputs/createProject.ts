import { IsString } from "class-validator";

export class CreateProjectInput {
  @IsString()
  name!: string;
}