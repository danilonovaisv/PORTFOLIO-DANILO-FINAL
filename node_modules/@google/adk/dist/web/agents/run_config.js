var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { logger } from "../utils/logger.js";
var StreamingMode = /* @__PURE__ */ ((StreamingMode2) => {
  StreamingMode2["NONE"] = "none";
  StreamingMode2["SSE"] = "sse";
  StreamingMode2["BIDI"] = "bidi";
  return StreamingMode2;
})(StreamingMode || {});
function createRunConfig(params = {}) {
  return __spreadValues({
    saveInputBlobsAsArtifacts: false,
    supportCfc: false,
    enableAffectiveDialog: false,
    streamingMode: "none" /* NONE */,
    maxLlmCalls: validateMaxLlmCalls(params.maxLlmCalls || 500)
  }, params);
}
function validateMaxLlmCalls(value) {
  if (value > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      "maxLlmCalls should be less than ".concat(Number.MAX_SAFE_INTEGER, ".")
    );
  }
  if (value <= 0) {
    logger.warn(
      "maxLlmCalls is less than or equal to 0. This will result in no enforcement on total number of llm calls that will be made for a run. This may not be ideal, as this could result in a never ending communication between the model and the agent in certain cases."
    );
  }
  return value;
}
export {
  StreamingMode,
  createRunConfig
};
