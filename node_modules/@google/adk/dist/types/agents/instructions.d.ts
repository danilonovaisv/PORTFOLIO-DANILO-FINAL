/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ReadonlyContext } from './readonly_context.js';
/**
 * Populates values in the instruction template, e.g. state, artifact, etc.
 *
 * ```
 * async function buildInstruction(
 *     readonlyContext: ReadonlyContext,
 * ): Promise<string> {
 *   return await injectSessionState(
 *       'You can inject a state variable like {var_name} or an artifact ' +
 *       '{artifact.file_name} into the instruction template.',
 *       readonlyContext,
 *   );
 * }
 *
 * const agent = new LlmAgent({
 *     model: 'gemini-1.5-flash',
 *     name: 'agent',
 *     instruction: buildInstruction,
 * });
 * ```
 *
 * @param template The instruction template.
 * @param readonlyContext The read-only context
 * @returns The instruction template with values populated.
 */
export declare function injectSessionState(template: string, readonlyContext: ReadonlyContext): Promise<string>;
