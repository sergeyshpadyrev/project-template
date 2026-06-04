import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Task } from "@repo/core-types";

import rpc from "@repo/core-sdk";

import { queryKeys } from "./queryKeys";

const useTasks = (projectId: string) =>
  useQuery({
    queryKey: queryKeys.projectTasks(projectId),
    queryFn: () => rpc.call.getTasks({ projectId }),
  });

const useCreateTask = () => {
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

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { taskId: string; task: Partial<Omit<Task, "id">> }) =>
      rpc.call.updateTask(input),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks }),
        queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
      ]),
  });
};

const useDeleteTask = () => {
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

export default {
  useCreate: useCreateTask,
  useDelete: useDeleteTask,
  useList: useTasks,
  useUpdate: useUpdateTask,
};
