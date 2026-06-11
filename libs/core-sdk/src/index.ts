import { ClientServerInterface } from "@repo/core-types";

import {
  createRPC,
  ExecutionRequest,
  ExecutionResponse,
} from "@repo/utils-rpc";

const rpc = createRPC<ClientServerInterface>({
  send: async (request: ExecutionRequest) => {
    const response = await fetch("http://localhost:4001/rpc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request }),
    });
    return (await response.json()) as ExecutionResponse;
  },
});

export default rpc;
