import config from "./config";
import { fromEnv, fromInstanceMetadata, fromNodeProviderChain } from "@aws-sdk/credential-providers";

type AwsCredentials = { accessKeyId: string; secretAccessKey: string; sessionToken?: string };

export async function getAwsCredentials(): Promise<AwsCredentials> {
  switch (config.from) {
    case "auto":
      return await fromNodeProviderChain()();
    case "env_vars":
      return await fromEnv()();
    case "instance_metadata":
      return await fromInstanceMetadata()();
  }
}
