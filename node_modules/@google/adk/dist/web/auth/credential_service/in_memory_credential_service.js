/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class InMemoryCredentialService {
  constructor() {
    this.credentials = {};
  }
  loadCredential(authConfig, toolContext) {
    const credentialBucket = this.getBucketForCurrentContext(toolContext);
    return Promise.resolve(credentialBucket[authConfig.credentialKey]);
  }
  async saveCredential(authConfig, toolContext) {
    const credentialBucket = this.getBucketForCurrentContext(toolContext);
    if (authConfig.exchangedAuthCredential) {
      credentialBucket[authConfig.credentialKey] = authConfig.exchangedAuthCredential;
    }
  }
  getBucketForCurrentContext(toolContext) {
    const { appName, userId } = toolContext.invocationContext.session;
    if (!this.credentials[appName]) {
      this.credentials[appName] = {};
    }
    if (!this.credentials[appName][userId]) {
      this.credentials[appName][userId] = {};
    }
    return this.credentials[appName][userId];
  }
}
export {
  InMemoryCredentialService
};
