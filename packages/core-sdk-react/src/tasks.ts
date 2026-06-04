import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Task } from "@repo/core-types";

import rpc from "@repo/core-sdk";

import { queryKeys } from "./queryKeys";

export const useTasks = (projectId: string) =>
  useQuery({
    queryKey: queryKeys.projectTasks(projectId),
    queryFn: () => rpc.call.getTasks({ projectId }),
  });

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { projectId: string; task: Omit<Task, "id"> }) =>
      rpc.call.createTask(input),
    onSuccess: (_task, { projectId }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.projectTasks(projectId),
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
      ]),
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      taskId: string;
      task: Partial<Omit<Task, "id">>;
    }) => rpc.call.updateTask(input),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
      ]),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { taskId: string }) => rpc.call.deleteTask(input),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
      ]),
  });
};
