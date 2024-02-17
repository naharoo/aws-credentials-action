import config from "./config";
import { exportVariable, setOutput, setSecret } from "@actions/core";

export function setOutputAndExportVariable({
  accessKeyId,
  secretAccessKey,
  sessionToken,
}: {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}) {
  setSecret(accessKeyId);
  setOutput("accessKeyId", accessKeyId);
  if (config.export) exportVariable("AWS_ACCESS_KEY_ID", accessKeyId);

  setSecret(secretAccessKey);
  setOutput("secretAccessKey", secretAccessKey);
  if (config.export) exportVariable("AWS_SECRET_ACCESS_KEY", secretAccessKey);

  if (sessionToken) {
    setSecret(sessionToken);
    setOutput("sessionToken", sessionToken);
    if (config.export) exportVariable("AWS_SESSION_TOKEN", sessionToken);
  }
}
