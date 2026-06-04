export const queryKeys = {
  projects: ["projects"] as const,
  tasks: ["tasks"] as const,
  projectTasks: (projectId: string) => ["tasks", projectId] as const,
};
