import { Project, User } from '@repo/types';

import { GetUserProjectsInput } from './dto/getUserProjects';

export type DashboardClientServerInterface = {
  getUserProjects(input: GetUserProjectsInput): Promise<Project[]>;
  getUsers(): Promise<User[]>;
};
