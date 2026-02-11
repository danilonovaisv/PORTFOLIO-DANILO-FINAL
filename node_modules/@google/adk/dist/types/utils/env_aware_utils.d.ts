/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns true if the environment is a browser.
 */
export declare function isBrowser(): boolean;
export declare function randomUUID(): string;
/**
 * Encodes the given string to base64.
 *
 * @param data The string to encode.
 * @return The base64-encoded string.
 */
export declare function base64Encode(data: string): string;
/**
 * Decodes the given base64 string to a string.
 *
 * @param data The base64-encoded string.
 * @return The decoded string.
 */
export declare function base64Decode(data: string): string;
/**
 * Checks if the given string is base64-encoded.
 *
 * @param data The string to check.
 * @return True if the string is base64-encoded, false otherwise.
 */
export declare function isBase64Encoded(data: string): boolean;
