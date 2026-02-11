/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function createSession(params) {
  return {
    id: params.id,
    appName: params.appName,
    userId: params.userId || "",
    state: params.state || {},
    events: params.events || [],
    lastUpdateTime: params.lastUpdateTime || 0
  };
}
export {
  createSession
};
