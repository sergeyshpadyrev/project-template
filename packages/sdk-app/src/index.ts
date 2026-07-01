import { AppClientServerInterface } from '@repo/types-app';
import { createRPC, ExecutionRequest, ExecutionResponse } from '@repo/utils-rpc';

const rpc = createRPC<AppClientServerInterface>({
  send: async (request: ExecutionRequest) => {
    const response = await fetch('http://localhost:4001/rpc', {
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
