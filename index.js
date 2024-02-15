const core = require('@actions/core');
const github = require('@actions/github');
const {fromInstanceMetadata} = require("@aws-sdk/credential-providers");

async function run() {
    const awsCredentialIdentity = await fromInstanceMetadata()();

    core.setOutput('access_key_id', awsCredentialIdentity.accessKeyId);
    core.setSecret(awsCredentialIdentity.accessKeyId);

    core.setOutput('secret_access_key', awsCredentialIdentity.secretAccessKey);
    core.setSecret(awsCredentialIdentity.secretAccessKey);

    core.setOutput('session_token', awsCredentialIdentity.sessionToken);
    core.setSecret(awsCredentialIdentity.sessionToken);

    console.log('Successfully retrieved AWS credentials from instance metadata.');

    // Just to force @actions/github to be included in the bundle
    github.context.payload
}

run().then(() => true).catch(error => {
    core.setFailed(error.message)
    return false;
});
