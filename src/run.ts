import { assumeRole } from "./assume-role";
import { getAwsCredentials } from "./aws-credentials-factory";
import config from "./config";
import { setOutputAndExportVariable } from "./output";

const credentials = await getAwsCredentials();

if (config.assumeRoleArn) {
  const assumedCredentials = await assumeRole({
    region: config.region!,
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    sessionToken: credentials.sessionToken,
    roleArn: config.assumeRoleArn,
    sessionName: `aws-credentials-action-${new Date().toISOString()}`,
    durationSeconds: config.assumeRoleDurationSeconds,
  });
  setOutputAndExportVariable(assumedCredentials);
} else {
  setOutputAndExportVariable(credentials);
}
