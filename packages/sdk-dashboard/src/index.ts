import ports from '@repo/config-ports';
import { DashboardClientServerInterface } from '@repo/types-dashboard';
import { createRPC, ExecutionRequest, ExecutionResponse } from '@repo/utils-rpc';

const rpc = createRPC<DashboardClientServerInterface>({
  send: async (request: ExecutionRequest) => {
    const response = await fetch(`http://localhost:${ports.dashboardApi}/rpc`, {
      body: JSON.stringify({ request }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    return (await response.json()) as ExecutionResponse;
  },
});

export default rpc;
