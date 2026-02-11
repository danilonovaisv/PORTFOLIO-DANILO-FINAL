/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Content, GenerateContentConfig, LiveConnectConfig, SchemaUnion } from '@google/genai';
import { BaseTool } from '../tools/base_tool.js';
/**
 * LLM request class that allows passing in tools, output schema and system
 * instructions to the model.
 */
export interface LlmRequest {
    /**
     * The model name.
     */
    model?: string;
    /**
     * The contents to send to the model.
     */
    contents: Content[];
    /**
     * Additional config for the generate content request.
     * Tools in generateContentConfig should not be set directly; use appendTools.
     */
    config?: GenerateContentConfig;
    liveConnectConfig: LiveConnectConfig;
    /**
     * The tools dictionary. Excluded from JSON serialization.
     */
    toolsDict: {
        [key: string]: BaseTool;
    };
}
/**
 * Appends instructions to the system instruction.
 * @param instructions The instructions to append.
 */
export declare function appendInstructions(llmRequest: LlmRequest, instructions: string[]): void;
/**
 * Appends tools to the request.
 * @param tools The tools to append.
 */
export declare function appendTools(llmRequest: LlmRequest, tools: BaseTool[]): void;
/**
 * Sets the output schema for the request.
 *
 * @param schema The JSON Schema object to set as the output schema.
 */
export declare function setOutputSchema(llmRequest: LlmRequest, schema: SchemaUnion): void;
