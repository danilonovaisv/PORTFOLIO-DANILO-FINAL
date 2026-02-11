/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A state mapping that maintains the current value and the pending-commit
 * delta.
 */
export declare class State {
    /** The current value of the state. */
    private value;
    /** The delta change to the current value that hasn't been committed. */
    private delta;
    static readonly APP_PREFIX = "app:";
    static readonly USER_PREFIX = "user:";
    static readonly TEMP_PREFIX = "temp:";
    constructor(
    /** The current value of the state. */
    value?: Record<string, unknown>, 
    /** The delta change to the current value that hasn't been committed. */
    delta?: Record<string, unknown>);
    /**
     * Returns the value of the state dict for the given key.
     *
     * @param key The key to get the value for.
     * @param defaultValue The default value to return if the key is not found.
     * @return The value of the state for the given key, or the default value if
     *     not found.
     */
    get<T>(key: string, defaultValue?: T): T | undefined;
    /**
     * Sets the value of the state dict for the given key.
     *
     * @param key The key to set the value for.
     * @param value The value to set.
     */
    set(key: string, value: unknown): void;
    /**
     * Whether the state has pending delta.
     */
    has(key: string): boolean;
    /**
     * Whether the state has pending delta.
     */
    hasDelta(): boolean;
    /**
     * Updates the state dict with the given delta.
     *
     * @param delta The delta to update the state with.
     */
    update(delta: Record<string, unknown>): void;
    /**
     * Returns the state as a plain JSON object.
     */
    toRecord(): Record<string, unknown>;
}
