import config from "./config";
import { fromEnv, fromInstanceMetadata, fromNodeProviderChain } from "@aws-sdk/credential-providers";

type AwsCredentials = { accessKeyId: string; secretAccessKey: string; sessionToken?: string };

function areAwsCredentialsProvidedAsInput(): boolean {
  return (
    !!config.aws_access_key_id &&
    config.aws_access_key_id.length > 0 &&
    !!config.aws_secret_access_key &&
    config.aws_secret_access_key.length > 0
  );
}

function getAwsCredentialsFromInput() {
  return {
    accessKeyId: config.aws_access_key_id!,
    secretAccessKey: config.aws_secret_access_key!,
    sessionToken: config.aws_session_token,
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
