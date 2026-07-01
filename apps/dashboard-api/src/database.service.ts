import { Injectable, NotFoundException } from '@nestjs/common';
import { Project, User } from '@repo/types';
import { GetUserProjectsInput } from '@repo/types-dashboard/dto/getUserProjects';

@Injectable()
export class DatabaseService {
  async getUserProjects(input: GetUserProjectsInput): Promise<Project[]> {
    return [];
  }

  async getUsers(): Promise<User[]> {
    return [];
  }
}
