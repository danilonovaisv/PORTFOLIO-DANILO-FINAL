/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { version } from "../version.js";
import { isBrowser } from "./env_aware_utils.js";
const ADK_LABEL = "google-adk";
const LANGUAGE_LABEL = "gl-typescript";
const AGENT_ENGINE_TELEMETRY_TAG = "remote_reasoning_engine";
const AGENT_ENGINE_TELEMETRY_ENV_VARIABLE_NAME = "GOOGLE_CLOUD_AGENT_ENGINE_ID";
function _getDefaultLabels() {
  let frameworkLabel = `${ADK_LABEL}/${version}`;
  if (!isBrowser() && process.env[AGENT_ENGINE_TELEMETRY_ENV_VARIABLE_NAME]) {
    frameworkLabel = `${frameworkLabel}+${AGENT_ENGINE_TELEMETRY_TAG}`;
  }
  const languageLabel = `${LANGUAGE_LABEL}/${isBrowser() ? window.navigator.userAgent : process.version}`;
  return [frameworkLabel, languageLabel];
}
function getClientLabels() {
  const labels = _getDefaultLabels();
  return labels;
}
export {
  getClientLabels
};
