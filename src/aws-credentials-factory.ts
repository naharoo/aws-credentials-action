import config from "./config";
import { isNotBlank } from "./utils";
import { fromEnv, fromInstanceMetadata, fromNodeProviderChain } from "@aws-sdk/credential-providers";

export type AwsCredentials = { accessKeyId: string; secretAccessKey: string; sessionToken?: string };

function areAwsCredentialsProvidedAsInput(): boolean {
  return isNotBlank(config.accessKeyId) && isNotBlank(config.secretAccessKey);
}

function getAwsCredentialsFromInput() {
  return {
    accessKeyId: config.accessKeyId!,
    secretAccessKey: config.secretAccessKey!,
    sessionToken: config.sessionToken,
  };
}

export async function getAwsCredentials(): Promise<AwsCredentials> {
  switch (config.source) {
    case "auto":
      if (areAwsCredentialsProvidedAsInput()) {
        return getAwsCredentialsFromInput();
      }
      return await fromNodeProviderChain({ profile: config.profile })();
    case "env_vars":
      return await fromEnv()();
    case "instance_metadata":
      return await fromInstanceMetadata()();
    case "input":
      return getAwsCredentialsFromInput();
  }
}
