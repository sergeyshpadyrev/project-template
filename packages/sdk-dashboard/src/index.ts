import { createRPC, ExecutionRequest, ExecutionResponse } from '@repo/utils-rpc';
import { DashboardClientServerInterface } from '@repo/types-dashboard';
import ports from '@repo/config-ports';

const rpc = createRPC<DashboardClientServerInterface>({
  send: async (request: ExecutionRequest) => {
    const response = await fetch(`http://localhost:${ports.apiDashboard}/rpc`, {
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
