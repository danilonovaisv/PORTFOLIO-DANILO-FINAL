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
function createEventActions(state = {}) {
  return __spreadValues({
    stateDelta: {},
    artifactDelta: {},
    requestedAuthConfigs: {},
    requestedToolConfirmations: {}
  }, state);
}
function mergeEventActions(sources, target) {
  const result = createEventActions();
  if (target) {
    Object.assign(result, target);
  }
  for (const source of sources) {
    if (!source) continue;
    if (source.stateDelta) {
      Object.assign(result.stateDelta, source.stateDelta);
    }
    if (source.artifactDelta) {
      Object.assign(result.artifactDelta, source.artifactDelta);
    }
    if (source.requestedAuthConfigs) {
      Object.assign(result.requestedAuthConfigs, source.requestedAuthConfigs);
    }
    if (source.requestedToolConfirmations) {
      Object.assign(
        result.requestedToolConfirmations,
        source.requestedToolConfirmations
      );
    }
    if (source.skipSummarization !== void 0) {
      result.skipSummarization = source.skipSummarization;
    }
    if (source.transferToAgent !== void 0) {
      result.transferToAgent = source.transferToAgent;
    }
    if (source.escalate !== void 0) {
      result.escalate = source.escalate;
    }
  }
  return result;
}
export {
  createEventActions,
  mergeEventActions
};
