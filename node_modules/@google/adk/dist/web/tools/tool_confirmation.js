/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ToolConfirmation {
  constructor({
    hint,
    confirmed,
    payload
  }) {
    this.hint = hint != null ? hint : "";
    this.confirmed = confirmed;
    this.payload = payload;
  }
}
export {
  ToolConfirmation
};
