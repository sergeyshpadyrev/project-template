export const queryKeys = {
  users: ['users'] as const,
  userProjects: (userId: string) => ['users', userId, "projects"] as const,
};
