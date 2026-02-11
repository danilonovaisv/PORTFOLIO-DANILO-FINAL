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
  return {
    saveInputBlobsAsArtifacts: false,
    supportCfc: false,
    enableAffectiveDialog: false,
    streamingMode: "none" /* NONE */,
    maxLlmCalls: validateMaxLlmCalls(params.maxLlmCalls || 500),
    ...params
  };
}
function validateMaxLlmCalls(value) {
  if (value > Number.MAX_SAFE_INTEGER) {
    throw new Error(
      `maxLlmCalls should be less than ${Number.MAX_SAFE_INTEGER}.`
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
