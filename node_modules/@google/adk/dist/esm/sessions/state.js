/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class State {
  constructor(value = {}, delta = {}) {
    this.value = value;
    this.delta = delta;
  }
  /**
   * Returns the value of the state dict for the given key.
   *
   * @param key The key to get the value for.
   * @param defaultValue The default value to return if the key is not found.
   * @return The value of the state for the given key, or the default value if
   *     not found.
   */
  get(key, defaultValue) {
    if (key in this.delta) {
      return this.delta[key];
    }
    if (key in this.value) {
      return this.value[key];
    }
    return defaultValue;
  }
  /**
   * Sets the value of the state dict for the given key.
   *
   * @param key The key to set the value for.
   * @param value The value to set.
   */
  set(key, value) {
    this.value[key] = value;
    this.delta[key] = value;
  }
  /**
   * Whether the state has pending delta.
   */
  has(key) {
    return key in this.value || key in this.delta;
  }
  /**
   * Whether the state has pending delta.
   */
  hasDelta() {
    return Object.keys(this.delta).length > 0;
  }
  /**
   * Updates the state dict with the given delta.
   *
   * @param delta The delta to update the state with.
   */
  update(delta) {
    this.delta = { ...this.delta, ...delta };
    this.value = { ...this.value, ...delta };
  }
  /**
   * Returns the state as a plain JSON object.
   */
  toRecord() {
    return { ...this.value, ...this.delta };
  }
}
State.APP_PREFIX = "app:";
State.USER_PREFIX = "user:";
State.TEMP_PREFIX = "temp:";
export {
  State
};
