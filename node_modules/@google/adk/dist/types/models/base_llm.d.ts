/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseLlmConnection } from './base_llm_connection.js';
import { LlmRequest } from './llm_request.js';
import { LlmResponse } from './llm_response.js';
/**
 * A unique symbol to identify BaseLlm classes.
 * Defined once and shared by all BaseLlm instances.
 */
declare const BASE_MODEL_SYMBOL: unique symbol;
/**
 * Type guard to check if an object is an instance of BaseLlm.
 * @param obj The object to check.
 * @returns True if the object is an instance of BaseLlm, false otherwise.
 */
export declare function isBaseLlm(obj: unknown): obj is BaseLlm;
/**
 * The BaseLLM class.
 */
export declare abstract class BaseLlm {
    /**
     * A unique symbol to identify BaseLlm classes.
     */
    readonly [BASE_MODEL_SYMBOL] = true;
    readonly model: string;
    /**
     * Creates an instance of BaseLLM.
     * @param params The parameters for creating a BaseLlm instance.
     * @param params.model The name of the LLM, e.g. gemini-1.5-flash or
     *     gemini-1.5-flash-001.
     */
    constructor({ model }: {
        model: string;
    });
    /**
     * List of supported models in regex for LlmRegistry.
     */
    static readonly supportedModels: Array<string | RegExp>;
    /**
     * Generates one content from the given contents and tools.
     *
     * @param llmRequest  LlmRequest, the request to send to the LLM.
     * @param stream whether to do streaming call.
     * For non-streaming call, it will only yield one Content.
     * @return A generator of LlmResponse.
     */
    abstract generateContentAsync(llmRequest: LlmRequest, stream?: boolean): AsyncGenerator<LlmResponse, void>;
    /**
     * Creates a live connection to the LLM.
     *
     * @param llmRequest LlmRequest, the request to send to the LLM.
     * @return A live connection to the LLM.
     */
    abstract connect(llmRequest: LlmRequest): Promise<BaseLlmConnection>;
    protected get trackingHeaders(): Record<string, string>;
    /**
     * Appends a user content, so that model can continue to output.
     *
     * @param llmRequest LlmRequest, the request to send to the LLM.
     */
    maybeAppendUserContent(llmRequest: LlmRequest): void;
}
export {};
