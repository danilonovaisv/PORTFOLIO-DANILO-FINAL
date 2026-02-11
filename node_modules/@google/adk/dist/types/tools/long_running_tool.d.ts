/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FunctionDeclaration } from '@google/genai';
import { FunctionTool, ToolInputParameters, ToolOptions } from './function_tool.js';
export declare class LongRunningFunctionTool<TParameters extends ToolInputParameters = undefined> extends FunctionTool<TParameters> {
    /**
     * The constructor acts as the user-friendly factory.
     * @param options The configuration for the tool.
     */
    constructor(options: ToolOptions<TParameters>);
    /**
     * Provide a schema for the function.
     */
    _getDeclaration(): FunctionDeclaration;
}
