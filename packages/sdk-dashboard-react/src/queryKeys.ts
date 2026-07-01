export const queryKeys = {
  userProjects: (userId: string) => ['users', userId, 'projects'] as const,
  users: ['users'] as const,
};
