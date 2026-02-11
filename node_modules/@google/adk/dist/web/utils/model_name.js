/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const MODEL_NAME_PATTERN = "^projects/[^/]+/locations/[^/]+/publishers/[^/]+/models/(.+)$";
function extractModelName(modelString) {
  const match = modelString.match(MODEL_NAME_PATTERN);
  if (match) {
    return match[1];
  }
  return modelString;
}
function isGeminiModel(modelString) {
  const modelName = extractModelName(modelString);
  return modelName.startsWith("gemini-");
}
function parseVersion(versionString) {
  if (!/^\d+(\.\d+)*$/.test(versionString)) {
    return { valid: false, major: 0, minor: 0, patch: 0 };
  }
  const parts = versionString.split(".").map((part) => parseInt(part, 10));
  return {
    valid: true,
    major: parts[0],
    minor: parts.length > 1 ? parts[1] : 0,
    patch: parts.length > 2 ? parts[2] : 0
  };
}
function isGemini1Model(modelString) {
  const modelName = extractModelName(modelString);
  return modelName.startsWith("gemini-1");
}
function isGemini2OrAbove(modelString) {
  if (!modelString) {
    return false;
  }
  const modelName = extractModelName(modelString);
  if (!modelName.startsWith("gemini-")) {
    return false;
  }
  const versionString = modelName.slice("gemini-".length).split("-", 1)[0];
  const parsedVersion = parseVersion(versionString);
  return parsedVersion.valid && parsedVersion.major >= 2;
}
export {
  extractModelName,
  isGemini1Model,
  isGemini2OrAbove,
  isGeminiModel
};
