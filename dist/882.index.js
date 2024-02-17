"use strict";
exports.id = 882;
exports.ids = [882];
exports.modules = {

/***/ 6607:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ getAwsCredentials)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9598);
/* harmony import */ var _aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6187);
/* harmony import */ var _aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_1__);


async function getAwsCredentials() {
    switch (_config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].source */ .Z.source) {
        case "auto":
            return await (0,_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_1__.fromNodeProviderChain)({ profile: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].profile */ .Z.profile })();
        case "env_vars":
            return await (0,_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_1__.fromEnv)()();
        case "instance_metadata":
            return await (0,_aws_sdk_credential_providers__WEBPACK_IMPORTED_MODULE_1__.fromInstanceMetadata)()();
        case "input":
            return {
                accessKeyId: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].aws_access_key_id */ .Z.aws_access_key_id,
                secretAccessKey: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].aws_secret_access_key */ .Z.aws_secret_access_key,
                sessionToken: _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"].aws_session_token */ .Z.aws_session_token,
            };
    }
}


/***/ }),

/***/ 9598:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9093);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8047);
/* harmony import */ var zod_validation_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8249);



const configSchema = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
    export: zod__WEBPACK_IMPORTED_MODULE_1__.z["enum"](["true", "false"]).transform(value => value === "true"),
    source: zod__WEBPACK_IMPORTED_MODULE_1__.z["enum"](["auto", "instance_metadata", "env_vars", "input"]),
    profile: zod__WEBPACK_IMPORTED_MODULE_1__.z.string()
        .optional()
        .transform(value => value ?? undefined),
    aws_access_key_id: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().optional(),
    aws_secret_access_key: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().optional(),
    aws_session_token: zod__WEBPACK_IMPORTED_MODULE_1__.z.string().optional(),
})
    .refine(data => {
    // If source is 'input', then aws_access_key_id and aws_secret_access_key must be provided
    if (data.source === "input") {
        return (data.aws_access_key_id &&
            data.aws_access_key_id.length > 0 &&
            data.aws_secret_access_key &&
            data.aws_secret_access_key.length > 0);
    }
    // If source is not 'input', then no additional validation is needed
    return true;
}, {
    // Custom error message
    message: "aws_access_key_id and aws_secret_access_key are required when source is input",
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
        aws_access_key_id: getActionInputValue("aws_access_key_id"),
        aws_secret_access_key: getActionInputValue("aws_secret_access_key"),
        aws_session_token: getActionInputValue("aws_session_token"),
    });
}
let config;
try {
    config = parseConfig();
}
catch (err) {
    if (err instanceof zod__WEBPACK_IMPORTED_MODULE_1__.z.ZodError) {
        throw (0,zod_validation_error__WEBPACK_IMPORTED_MODULE_2__/* .fromZodError */ .CC)(err);
    }
    throw err;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);


/***/ }),

/***/ 882:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _aws_credentials_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6607);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9598);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9093);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_2__);



const { accessKeyId, secretAccessKey, sessionToken } = await (0,_aws_credentials_factory__WEBPACK_IMPORTED_MODULE_0__/* .getAwsCredentials */ .L)();
(0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.setSecret)(accessKeyId);
(0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.setOutput)("aws_access_key_id", accessKeyId);
if (_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"]["export"] */ .Z["export"])
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.exportVariable)("AWS_ACCESS_KEY_ID", accessKeyId);
(0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.setSecret)(secretAccessKey);
(0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.setOutput)("aws_secret_access_key", secretAccessKey);
if (_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"]["export"] */ .Z["export"])
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.exportVariable)("AWS_SECRET_ACCESS_KEY", secretAccessKey);
if (sessionToken) {
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.setSecret)(sessionToken);
    (0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.setOutput)("aws_session_token", sessionToken);
    if (_config__WEBPACK_IMPORTED_MODULE_1__/* ["default"]["export"] */ .Z["export"])
        (0,_actions_core__WEBPACK_IMPORTED_MODULE_2__.exportVariable)("AWS_SESSION_TOKEN", sessionToken);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

};
;