const semver = require("semver");
const packageJson = require("./package.json");

const newVersion = semver.inc(`${packageJson.version}.0`, "minor").replace(".0", "");

console.log(newVersion);
