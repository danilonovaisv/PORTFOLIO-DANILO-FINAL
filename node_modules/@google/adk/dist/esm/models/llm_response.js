/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function createLlmResponse(response) {
  var _a;
  const usageMetadata = response.usageMetadata;
  if (response.candidates && response.candidates.length > 0) {
    const candidate = response.candidates[0];
    if (((_a = candidate.content) == null ? void 0 : _a.parts) && candidate.content.parts.length > 0) {
      return {
        content: candidate.content,
        groundingMetadata: candidate.groundingMetadata,
        usageMetadata,
        finishReason: candidate.finishReason
      };
    }
    return {
      errorCode: candidate.finishReason,
      errorMessage: candidate.finishMessage,
      usageMetadata,
      finishReason: candidate.finishReason
    };
  }
  if (response.promptFeedback) {
    return {
      errorCode: response.promptFeedback.blockReason,
      errorMessage: response.promptFeedback.blockReasonMessage,
      usageMetadata
    };
  }
  return {
    errorCode: "UNKNOWN_ERROR",
    errorMessage: "Unknown error.",
    usageMetadata
  };
}
export {
  createLlmResponse
};
