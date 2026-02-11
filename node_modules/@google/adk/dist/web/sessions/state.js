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
    this.delta = __spreadValues(__spreadValues({}, this.delta), delta);
    this.value = __spreadValues(__spreadValues({}, this.value), delta);
  }
  /**
   * Returns the state as a plain JSON object.
   */
  toRecord() {
    return __spreadValues(__spreadValues({}, this.value), this.delta);
  }
}
State.APP_PREFIX = "app:";
State.USER_PREFIX = "user:";
State.TEMP_PREFIX = "temp:";
export {
  State
};
