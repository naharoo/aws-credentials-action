import { AwsCredentials } from "./aws-credentials-factory";
import { AssumeRoleCommand, STSClient } from "@aws-sdk/client-sts";

type AssumeRoleProps = AwsCredentials & {
  region?: string;
  roleArn: string;
  sessionName: string;
  durationSeconds?: number;
};

export async function assumeRole({
  region,
  accessKeyId,
  secretAccessKey,
  sessionToken,
  roleArn,
  sessionName,
  durationSeconds,
}: AssumeRoleProps): Promise<AwsCredentials> {
  const stsClient = new STSClient({
    region,
    credentials: { accessKeyId, secretAccessKey, sessionToken },
  });

  const { Credentials } = await stsClient.send(
    new AssumeRoleCommand({
      RoleArn: roleArn,
      RoleSessionName: sessionName,
      DurationSeconds: durationSeconds,
    }),
  );
  if (!Credentials) {
    throw new Error("Failed to assume role");
  }

  return {
    accessKeyId: Credentials.AccessKeyId!,
    secretAccessKey: Credentials.SecretAccessKey!,
    sessionToken: Credentials?.SessionToken,
  };
}
