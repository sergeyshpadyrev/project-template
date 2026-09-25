import { IsString } from 'class-validator';

export class User {
  @IsString()
  id!: string;

  @IsString()
  name!: string;
}
