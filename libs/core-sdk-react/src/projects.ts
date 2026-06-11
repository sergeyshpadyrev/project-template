import rpc from "@repo/core-sdk";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "./queryKeys";

const useProjects = () =>
  useQuery({
    queryFn: () => rpc.call.getProjects(),
    queryKey: queryKeys.projects,
  });

const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string }) => rpc.call.createProject(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
  });
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { name: string; projectId: string; }) =>
      rpc.call.updateProject(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.projects }),
  });
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { projectId: string }) => rpc.call.deleteProject(input),
    onSuccess: (_data, { projectId }) => {
      queryClient.removeQueries({
        queryKey: queryKeys.projectTasks(projectId),
      });
      return queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
};

export default {
  useCreate: useCreateProject,
  useDelete: useDeleteProject,
  useList: useProjects,
  useUpdate: useUpdateProject,
};
