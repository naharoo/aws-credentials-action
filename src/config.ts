import { getInput } from "@actions/core";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const configSchema = z
  .object({
    export: z.enum(["true", "false"]).transform(value => value === "true"),
    source: z.enum(["auto", "instance_metadata", "env_vars", "input"]),
    profile: z
      .string()
      .optional()
      .transform(value => value ?? undefined),
    aws_access_key_id: z.string().optional(),
    aws_secret_access_key: z.string().optional(),
    aws_session_token: z.string().optional(),
  })
  .refine(
    data => {
      // If source is 'input', then aws_access_key_id and aws_secret_access_key must be provided
      if (data.source === "input") {
        return (
          data.aws_access_key_id &&
          data.aws_access_key_id.length > 0 &&
          data.aws_secret_access_key &&
          data.aws_secret_access_key.length > 0
        );
      }
      // If source is not 'input', then no additional validation is needed
      return true;
    },
    {
      // Custom error message
      message: "aws_access_key_id and aws_secret_access_key are required when source is input",
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
    aws_access_key_id: getActionInputValue("aws_access_key_id"),
    aws_secret_access_key: getActionInputValue("aws_secret_access_key"),
    aws_session_token: getActionInputValue("aws_session_token"),
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
