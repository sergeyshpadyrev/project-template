import { ClientServerInterface } from "@repo/core-types";

import { createRPC, ExecutionRequest } from "typed-remote-procedure-call";

const rpc = createRPC<ClientServerInterface>({
  send: async (request: ExecutionRequest) => {
    console.log({ request });
    return null as any;
  },
});
