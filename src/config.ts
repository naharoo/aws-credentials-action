import { getInput } from "@actions/core";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const configSchema = z
  .object({
    export: z.enum(["true", "false"]).transform(value => value === "true"),
    source: z.enum(["auto", "instance_metadata", "env_vars", "input"]),
    profile: z.ostring().transform(value => (value?.length ? value : undefined)),
    region: z.ostring().transform(value => (value?.length ? value : undefined)),
    accessKeyId: z.ostring().transform(value => (value?.length ? value : undefined)),
    secretAccessKey: z.ostring().transform(value => (value?.length ? value : undefined)),
    sessionToken: z.ostring().transform(value => (value?.length ? value : undefined)),
    assumeRoleArn: z.ostring().transform(value => (value?.length ? value : undefined)),
    assumeRoleDurationSeconds: z.coerce.number().optional(),
  })
  .refine(
    data => {
      // If source is 'input', then accessKeyId and secretAccessKey must be provided
      if (data.source === "input") {
        return (
          data.accessKeyId && data.accessKeyId.length > 0 && data.secretAccessKey && data.secretAccessKey.length > 0
        );
      }
      // If source is not 'input', then no additional validation is needed
      return true;
    },
    {
      message: "accessKeyId and secretAccessKey are required when source is input",
    },
  )
  .refine(
    data => {
      // If assumeRoleArn is provided, then region must be provided
      if (data.assumeRoleArn) {
        return data.region && data.region.length > 0;
      }
    },
    {
      message: "region is required when assumeRoleArn is provided",
    },
  );

function getActionInputValue(name: string) {
  const inputValue = getInput(name);
  return inputValue.length ? inputValue : undefined;
}

function parseConfig() {
  return configSchema.parse({
    export: getActionInputValue("export"),
    source: getActionInputValue("source"),
    profile: getActionInputValue("profile"),
    region: getActionInputValue("region"),
    accessKeyId: getActionInputValue("accessKeyId"),
    secretAccessKey: getActionInputValue("secretAccessKey"),
    sessionToken: getActionInputValue("sessionToken"),
    assumeRoleArn: getActionInputValue("assumeRoleArn"),
    assumeRoleDurationSeconds: getActionInputValue("assumeRoleDurationSeconds"),
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
