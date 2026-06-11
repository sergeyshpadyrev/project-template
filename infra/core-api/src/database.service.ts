import { Injectable, NotFoundException } from "@nestjs/common";
import { Project, Task } from "@repo/core-types";
import { randomUUID } from "crypto";

@Injectable()
export class DatabaseService {
  private projects: Project[] = [];

  async createProject(input: { name: string }): Promise<Project> {
    const project: Project = {
      id: randomUUID(),
      name: input.name,
      tasks: [],
    };
    this.projects.push(project);
    return project;
  }

  async createTask(input: {
    projectId: string;
    task: Omit<Task, "id">;
  }): Promise<Task> {
    const project = this.findProject(input.projectId);
    const task: Task = { id: randomUUID(), ...input.task };
    project.tasks.push(task);
    return task;
  }

  async deleteProject(input: { projectId: string }): Promise<void> {
    this.findProject(input.projectId);
    this.projects = this.projects.filter(
      (project) => project.id !== input.projectId,
    );
  }

  async deleteTask(input: { taskId: string }): Promise<void> {
    const project = this.findProjectByTaskId(input.taskId);
    project.tasks = project.tasks.filter((task) => task.id !== input.taskId);
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getTasks(input: { projectId: string }): Promise<Task[]> {
    return this.findProject(input.projectId).tasks;
  }

  async updateProject(input: {
    name: string;
    projectId: string;
  }): Promise<Project> {
    const project = this.findProject(input.projectId);
    project.name = input.name;
    return project;
  }

  async updateTask(input: {
    task: Partial<Omit<Task, "id">>;
    taskId: string;
  }): Promise<Task> {
    const project = this.findProjectByTaskId(input.taskId);
    const task = project.tasks.find((task) => task.id === input.taskId)!;
    Object.assign(task, input.task);
    return task;
  }

  private findProject(projectId: string): Project {
    const project = this.projects.find((project) => project.id === projectId);
    if (!project)
      throw new NotFoundException(`Project not found: ${projectId}`);
    return project;
  }

  private findProjectByTaskId(taskId: string): Project {
    const project = this.projects.find((project) =>
      project.tasks.some((task) => task.id === taskId),
    );
    if (!project) throw new NotFoundException(`Task not found: ${taskId}`);
    return project;
  }
}
