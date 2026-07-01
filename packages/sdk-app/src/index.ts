import ports from '@repo/config-ports';
import { AppClientServerInterface } from '@repo/types-app';
import { createRPC, ExecutionRequest, ExecutionResponse } from '@repo/utils-rpc';

const rpc = createRPC<AppClientServerInterface>({
  send: async (request: ExecutionRequest) => {
    const response = await fetch(`http://localhost:${ports.apiApp}/rpc`, {
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
