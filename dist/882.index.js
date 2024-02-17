"use strict";
exports.id = 882;
exports.ids = [882];
exports.modules = {

/***/ 1905:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ assumeRole)
/* harmony export */ });
/* harmony import */ var _aws_sdk_client_sts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9507);
/* harmony import */ var _aws_sdk_client_sts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_sts__WEBPACK_IMPORTED_MODULE_0__);

async function assumeRole({ region, accessKeyId, secretAccessKey, sessionToken, roleArn, sessionName, durationSeconds, }) {
    const stsClient = new _aws_sdk_client_sts__WEBPACK_IMPORTED_MODULE_0__.STSClient({
        region,
        credentials: { accessKeyId, secretAccessKey, sessionToken },
    });
    const { Credentials } = await stsClient.send(new _aws_sdk_client_sts__WEBPACK_IMPORTED_MODULE_0__.AssumeRoleCommand({
        RoleArn: roleArn,
        RoleSessionName: sessionName,
        DurationSeconds: durationSeconds,
    }));
    if (!Credentials) {
        throw new Error("Failed to assume role");
    }
    return {
        accessKeyId: Credentials.AccessKeyId,
        secretAccessKey: Credentials.SecretAccessKey,
        sessionToken: Credentials?.SessionToken,
    };
}


/***/ }),

/***/ 6607:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ getAwsCredentials)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9598);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(442);
/* harmony import */ var _aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6187);
/* harmony import */ var _aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_2__);



function areAwsCredentialsProvidedAsInput() {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .isNotBlank */ .S)(_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].accessKeyId */ .Z.accessKeyId) && (0,_utils__WEBPACK_IMPORTED_MODULE_1__/* .isNotBlank */ .S)(_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].secretAccessKey */ .Z.secretAccessKey);
}
function getAwsCredentialsFromInput() {
    return {
        accessKeyId: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].accessKeyId */ .Z.accessKeyId,
        secretAccessKey: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].secretAccessKey */ .Z.secretAccessKey,
        sessionToken: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].sessionToken */ .Z.sessionToken,
    };
}
async function getAwsCredentials() {
    switch (_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].source */ .Z.source) {
        case "auto":
            if (areAwsCredentialsProvidedAsInput()) {
                return getAwsCredentialsFromInput();
            }
            return await (0,_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_2__.fromNodeProviderChain)({ profile: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].profile */ .Z.profile })();
        case "env_vars":
            return await (0,_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_2__.fromEnv)()();
        case "instance_metadata":
            return await (0,_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_2__.fromInstanceMetadata)()();
        case "input":
            return getAwsCredentialsFromInput();
    }
}


/***/ }),

/***/ 9598:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(442);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9093);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8047);
/* harmony import */ var zod_validation_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8249);




const configSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
    export: zod__WEBPACK_IMPORTED_MODULE_1__.z["enum"](["true", "false"]).transform(value => value === "true"),
    source: zod__WEBPACK_IMPORTED_MODULE_1__.z["enum"](["auto", "instance_metadata", "env_vars", "input"]),
    profile: zod__WEBPACK_IMPORTED_MODULE_1__.z.ostring().transform(value => ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(value) ? value : undefined)),
    region: zod__WEBPACK_IMPORTED_MODULE_1__.z.ostring().transform(value => ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(value) ? value : undefined)),
    accessKeyId: zod__WEBPACK_IMPORTED_MODULE_1__.z.ostring().transform(value => ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(value) ? value : undefined)),
    secretAccessKey: zod__WEBPACK_IMPORTED_MODULE_1__.z.ostring().transform(value => ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(value) ? value : undefined)),
    sessionToken: zod__WEBPACK_IMPORTED_MODULE_1__.z.ostring().transform(value => ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(value) ? value : undefined)),
    assumeRoleArn: zod__WEBPACK_IMPORTED_MODULE_1__.z.ostring().transform(value => ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(value) ? value : undefined)),
    assumeRoleDurationSeconds: zod__WEBPACK_IMPORTED_MODULE_1__.z.coerce.number().optional(),
})
    .refine(data => {
    // If source is 'input', then accessKeyId and secretAccessKey must be provided
    if (data.source === "input") {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(data.accessKeyId) && (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(data.secretAccessKey);
    }
    // If source is not 'input', then no additional validation is needed
    return true;
}, {
    message: "accessKeyId and secretAccessKey are required when source is input",
})
    .refine(data => {
    // If assumeRoleArn is provided, then region must be provided
    if ((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(data.assumeRoleArn)) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .isNotBlank */ .S)(data.region);
    }
    // If assumeRoleArn is not provided, then no additional validation is needed
    return true;
}, {
    message: "region is required when assumeRoleArn is provided",
});
function getActionInputValue(name) {
    const inputValue = (0,_actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput)(name);
    return inputValue.length ? inputValue : undefined;
}
function parseConfig() {
    return configSchema.parse({
        export: getActionInputValue("export"),
        source: getActionInputValue("source"),
        profile: getActionInputValue("profile"),
        region: getActionInputValue("region"),
        accessKeyId: getActionInputValue("accessKeyId"),
        secretAccessKey: getActionInputValue("secretAccessKey"),
        sessionToken: getActionInputValue("sessionToken"),
        assumeRoleArn: getActionInputValue("assumeRoleArn"),
        assumeRoleDurationSeconds: getActionInputValue("assumeRoleDurationSeconds"),
    });
}
let config;
try {
    config = parseConfig();
}
catch (err) {
    if (err instanceof zod__WEBPACK_IMPORTED_MODULE_1__.z.ZodError) {
        throw (0,zod_validation_error__WEBPACK_IMPORTED_MODULE_3__/* .fromZodError */ .CC)(err);
    }
    throw err;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);


/***/ }),

/***/ 1720:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ setOutputAndExportVariable)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9598);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9093);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_1__);


function setOutputAndExportVariable({ accessKeyId, secretAccessKey, sessionToken, }) {
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setSecret)(accessKeyId);
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setOutput)("accessKeyId", accessKeyId);
    if (_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"]["export"] */ .Z["export"])
        (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.exportVariable)("AWS_ACCESS_KEY_ID", accessKeyId);
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setSecret)(secretAccessKey);
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setOutput)("secretAccessKey", secretAccessKey);
    if (_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"]["export"] */ .Z["export"])
        (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.exportVariable)("AWS_SECRET_ACCESS_KEY", secretAccessKey);
    if (sessionToken) {
        (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setSecret)(sessionToken);
        (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.setOutput)("sessionToken", sessionToken);
        if (_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"]["export"] */ .Z["export"])
            (0,_actions_core__WEBPACK_IMPORTED_MODULE_1__.exportVariable)("AWS_SESSION_TOKEN", sessionToken);
    }
}


/***/ }),

/***/ 882:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assume_role__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1905);
/* harmony import */ var _aws_credentials_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6607);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9598);
/* harmony import */ var _output__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1720);




const credentials = await (0,_aws_credentials_factory__WEBPACK_IMPORTED_MODULE_0__/* .getAwsCredentials */ .L)();
if (_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"].assumeRoleArn */ .Z.assumeRoleArn) {
    const assumedCredentials = await (0,_assume_role__WEBPACK_IMPORTED_MODULE_3__/* .assumeRole */ .t)({
        region: _config__WEBPACK_IMPORTED_MODULE_1__/* ["default"].region */ .Z.region,
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        sessionToken: credentials.sessionToken,
        roleArn: _config__WEBPACK_IMPORTED_MODULE_1__/* ["default"].assumeRoleArn */ .Z.assumeRoleArn,
        sessionName: `aws-credentials-action-${new Date().toISOString()}`,
        durationSeconds: _config__WEBPACK_IMPORTED_MODULE_1__/* ["default"].assumeRoleDurationSeconds */ .Z.assumeRoleDurationSeconds,
    });
    (0,_output__WEBPACK_IMPORTED_MODULE_2__/* .setOutputAndExportVariable */ .I)(assumedCredentials);
}
else {
    (0,_output__WEBPACK_IMPORTED_MODULE_2__/* .setOutputAndExportVariable */ .I)(credentials);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ 442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ isNotBlank)
/* harmony export */ });
function isNotBlank(value) {
    return !!value && value.trim().length > 0;
}


/***/ })

};
;