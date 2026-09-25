import rpc from '@repo/sdk-app';
import { CreateTaskInput, DeleteTaskInput, UpdateTaskInput } from '@repo/types-app';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from './queryKeys';

const useTasks = (projectId: string) =>
  useQuery({
    queryFn: () => rpc.getTasks({ projectId }),
    queryKey: queryKeys.projectTasks(projectId),
  });

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => rpc.createTask(input),
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
    mutationFn: (input: UpdateTaskInput) => rpc.updateTask(input),
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
    mutationFn: (input: DeleteTaskInput) => rpc.deleteTask(input),
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
