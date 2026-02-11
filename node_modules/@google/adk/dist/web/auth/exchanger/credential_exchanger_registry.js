/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class CredentialExchangerRegistry {
  constructor() {
    this.exchangers = {};
  }
  /**
   * Register an exchanger instance for a credential type.
   * @param credentialType - The credential type to register for.
   * @param exchangerInstance - The exchanger instance to register.
   */
  register(credentialType, exchangerInstance) {
    this.exchangers[credentialType] = exchangerInstance;
  }
  /**
   * Get the exchanger instance for a credential type.
   * @param credentialType - The credential type to get exchanger for.
   * @returns The exchanger instance if registered, undefined otherwise.
   */
  getExchanger(credentialType) {
    return this.exchangers[credentialType];
  }
}
export {
  CredentialExchangerRegistry
};
