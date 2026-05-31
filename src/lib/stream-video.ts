import "server-only";

import { StreamClient } from "@stream-io/node-sdk";
// Increase default timeout (ms) to avoid 3s request aborts from the SDK
export const streamVideo = new StreamClient(
  process.env.STREAM_API_KEY as string,
  process.env.STREAM_SECRET_KEY as string,
  { timeout: 10000 },
);
