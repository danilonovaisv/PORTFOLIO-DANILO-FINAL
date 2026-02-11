/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseExampleProvider } from './base_example_provider.js';
import { Example } from './example.js';
/**
 * Converts a list of examples to a string that can be used in a system
 * instruction.
 */
export declare function convertExamplesToText(examples: Example[], model?: string): string;
export declare function buildExampleSi(examples: Example[] | BaseExampleProvider, query: string, model?: string): string;
