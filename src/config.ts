import { getInput } from "@actions/core";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const configSchema = z.object({
  export: z.enum(["true", "false"]).transform(value => value === "true"),
  from: z.enum(["auto", "instance_metadata", "env_vars"]),
});

function parseConfig() {
  return configSchema.parse({
    export: getInput("export", { required: true }),
    from: getInput("from", { required: true }),
  });
}

let config: z.infer<typeof configSchema>;

try {
  config = parseConfig();
} catch (err) {
  if (err instanceof z.ZodError) {
    throw fromZodError(err);
  }
  throw err;
}

export default config;
