import { ClientServerInterface } from "@repo/core-types";

import { createRPC, ExecutionRequest } from "@repo/utils-rpc";

const rpc = createRPC<ClientServerInterface>({
  send: async (request: ExecutionRequest) => {
    console.log({ request });
    return null as any;
  },
});

export default rpc;
