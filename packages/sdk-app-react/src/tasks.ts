import rpc from '@repo/core-sdk';
import { CreateTaskInput, DeleteTaskInput, Task, UpdateTaskInput } from '@repo/core-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from './queryKeys';

const useTasks = (projectId: string) =>
  useQuery({
    queryFn: () => rpc.call.getTasks({ projectId }),
    queryKey: queryKeys.projectTasks(projectId),
  });

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) =>
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
    mutationFn: (input: UpdateTaskInput) =>
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
    mutationFn: (input: DeleteTaskInput) => rpc.call.deleteTask(input),
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
