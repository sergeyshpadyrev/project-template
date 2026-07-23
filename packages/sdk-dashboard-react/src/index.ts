import rpc from '@repo/sdk-dashboard';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from './queryKeys';

const useUsers = () =>
  useQuery({
    queryFn: () => rpc.getUsers(),
    queryKey: queryKeys.users,
  });

const useUserProjects = (userId: string) =>
  useQuery({
    queryFn: () => rpc.getUserProjects({ userId }),
    queryKey: queryKeys.userProjects(userId),
  });

export default {
  useUserProjects,
  useUsers,
};
