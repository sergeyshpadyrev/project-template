import { Project, User } from '@repo/types';
import { GetUserProjectsInput } from './dto/getUserProjects';

export type DashboardClientServerInterface = {
  getUsers(): Promise<User[]>;
  getUserProjects(input: GetUserProjectsInput): Promise<Project[]>;
};
