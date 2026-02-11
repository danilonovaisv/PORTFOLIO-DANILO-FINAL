/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { State } from "../sessions/state.js";
async function injectSessionState(template, readonlyContext) {
  const invocationContext = readonlyContext.invocationContext;
  async function replaceMatchedKeyWithItsValue(match) {
    let key = match[0].replace(/^\{+/, "").replace(/\}+$/, "").trim();
    const isOptional = key.endsWith("?");
    if (isOptional) {
      key = key.slice(0, -1);
    }
    if (key.startsWith("artifact.")) {
      const fileName = key.substring("artifact.".length);
      if (invocationContext.artifactService === void 0) {
        throw new Error("Artifact service is not initialized.");
      }
      const artifact = await invocationContext.artifactService.loadArtifact({
        appName: invocationContext.session.appName,
        userId: invocationContext.session.userId,
        sessionId: invocationContext.session.id,
        filename: fileName
      });
      if (!artifact) {
        throw new Error("Artifact ".concat(fileName, " not found."));
      }
      return String(artifact);
    }
    if (!isValidStateName(key)) {
      return match[0];
    }
    if (key in invocationContext.session.state) {
      return String(invocationContext.session.state[key]);
    }
    if (isOptional) {
      return "";
    }
    throw new Error("Context variable not found: `".concat(key, "`."));
  }
  const pattern = /\{+[^{}]*}+/g;
  const result = [];
  let lastEnd = 0;
  const matches = template.matchAll(pattern);
  for (const match of matches) {
    result.push(template.slice(lastEnd, match.index));
    const replacement = await replaceMatchedKeyWithItsValue(match);
    result.push(replacement);
    lastEnd = match.index + match[0].length;
  }
  result.push(template.slice(lastEnd));
  return result.join("");
}
const isIdentifierPattern = /* @__PURE__ */ (() => {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/;
})();
function isIdentifier(s) {
  if (s === "" || s === void 0) {
    return false;
  }
  return isIdentifierPattern.test(s);
}
const VALID_PREFIXES = [State.APP_PREFIX, State.USER_PREFIX, State.TEMP_PREFIX];
function isValidStateName(variableName) {
  const parts = variableName.split(":");
  if (parts.length === 0 || parts.length > 2) {
    return false;
  }
  if (parts.length === 1) {
    return isIdentifier(variableName);
  }
  if (VALID_PREFIXES.includes(parts[0] + ":")) {
    return isIdentifier(parts[1]);
  }
  return false;
}
export {
  injectSessionState
};
