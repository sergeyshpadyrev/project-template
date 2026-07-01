import { IsString } from "class-validator";

export class GetUserProjectsInput {
  @IsString()
  userId!: string;
}