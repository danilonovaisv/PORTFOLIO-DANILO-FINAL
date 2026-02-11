/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Extract the actual model name from either simple or path-based format.
 *
 * @param modelString Either a simple model name like "gemini-2.5-pro" or
 *     a path-based model name like "projects/.../models/gemini-2.0-flash-001"
 * @return The extracted model name (e.g., "gemini-2.5-pro")
 */
export declare function extractModelName(modelString: string): string;
/**
 * Check if the model is a Gemini model using regex patterns.
 *
 * @param modelString Either a simple model name or path - based model name
 * @return true if it's a Gemini model, false otherwise.
 */
export declare function isGeminiModel(modelString: string): boolean;
/**
 * Check if the model is a Gemini 1.x model using regex patterns.
 *
 * @param modelString Either a simple model name or path - based model name
 * @return true if it's a Gemini 1.x model, false otherwise.
 */
export declare function isGemini1Model(modelString: string): boolean;
/**
 * Check if the model is a Gemini 2.x model using regex patterns.
 *
 * @param modelString Either a simple model name or path - based model name
 * @return true if it's a Gemini 2.x model, false otherwise.
 */
export declare function isGemini2OrAbove(modelString: string): boolean;
