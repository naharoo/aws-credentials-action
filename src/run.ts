import { getAwsCredentials } from "./aws-credentials-factory";
import config from "./config";
import { exportVariable, setOutput, setSecret } from "@actions/core";

const { accessKeyId, secretAccessKey, sessionToken } = await getAwsCredentials();

setSecret(accessKeyId);
setOutput("aws_access_key_id", accessKeyId);
if (config.export) exportVariable("AWS_ACCESS_KEY_ID", accessKeyId);

setSecret(secretAccessKey);
setOutput("aws_secret_access_key", secretAccessKey);
if (config.export) exportVariable("AWS_SECRET_ACCESS_KEY", secretAccessKey);

if (sessionToken) {
  setSecret(sessionToken);
  setOutput("aws_session_token", sessionToken);
  if (config.export) exportVariable("AWS_SESSION_TOKEN", sessionToken);
}
