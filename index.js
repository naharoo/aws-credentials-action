const core = require('@actions/core');
const github = require('@actions/github');
const {STSClient, GetSessionTokenCommand} = require("@aws-sdk/client-sts");

async function run() {
    const region = core.getInput('region');
    let durationSeconds = Number(core.getInput("duration_seconds"));

    const sts = new STSClient({region});
    const sessionToken = await sts.send(new GetSessionTokenCommand({DurationSeconds: durationSeconds}));

    core.setOutput('access_key_id', sessionToken.Credentials.AccessKeyId);
    core.setOutput('secret_access_key', sessionToken.Credentials.SecretAccessKey);
    core.setOutput('session_token', sessionToken.Credentials.SessionToken);

    console.log('Successfully generated temporary AWS credentials');

    // Just to force @actions/github to be included in the bundle
    github.context.payload
}

run().then(() => true).catch(error => {
    core.setFailed(error.message)
    return false;
});
