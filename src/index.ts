import { setFailed } from "@actions/core";

try {
  await import("./run");
} catch (error) {
  setFailed(error instanceof Error ? error.message : "Unknown error");
}
