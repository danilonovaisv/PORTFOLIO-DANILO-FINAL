/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleGenAI } from '@google/genai';
import { GoogleLLMVariant } from '../utils/variant_utils.js';
import { BaseLlm } from './base_llm.js';
import { BaseLlmConnection } from './base_llm_connection.js';
import { LlmRequest } from './llm_request.js';
import { LlmResponse } from './llm_response.js';
/**
 * The parameters for creating a Gemini instance.
 */
export interface GeminiParams {
    /**
     * The name of the model to use. Defaults to 'gemini-2.5-flash'.
     */
    model?: string;
    /**
     * The API key to use for the Gemini API. If not provided, it will look for
     * the GOOGLE_GENAI_API_KEY or GEMINI_API_KEY environment variable.
     */
    apiKey?: string;
    /**
     * Whether to use Vertex AI. If true, `project`, `location`
     * should be provided.
     */
    vertexai?: boolean;
    /**
     * The Vertex AI project ID. Required if `vertexai` is true.
     */
    project?: string;
    /**
     * The Vertex AI location. Required if `vertexai` is true.
     */
    location?: string;
    /**
     * Headers to merge with internally crafted headers.
     */
    headers?: Record<string, string>;
}
/**
 * Integration for Gemini models.
 */
export declare class Gemini extends BaseLlm {
    private readonly apiKey?;
    private readonly vertexai;
    private readonly project?;
    private readonly location?;
    private readonly headers?;
    /**
     * @param params The parameters for creating a Gemini instance.
     */
    constructor({ model, apiKey, vertexai, project, location, headers, }: GeminiParams);
    /**
     * A list of model name patterns that are supported by this LLM.
     *
     * @returns A list of supported models.
     */
    static readonly supportedModels: Array<string | RegExp>;
    private _apiClient?;
    private _apiBackend?;
    private _trackingHeaders?;
    private _liveApiVersion?;
    private _liveApiClient?;
    /**
     * Sends a request to the Gemini model.
     *
     * @param llmRequest LlmRequest, the request to send to the Gemini model.
     * @param stream bool = false, whether to do streaming call.
     * @yields LlmResponse: The model response.
     */
    generateContentAsync(llmRequest: LlmRequest, stream?: boolean): AsyncGenerator<LlmResponse, void>;
    get apiClient(): GoogleGenAI;
    get apiBackend(): GoogleLLMVariant;
    get liveApiVersion(): string;
    get liveApiClient(): GoogleGenAI;
    /**
     * Connects to the Gemini model and returns an llm connection.
     *
     * @param llmRequest LlmRequest, the request to send to the Gemini model.
     * @returns BaseLlmConnection, the connection to the Gemini model.
     */
    connect(llmRequest: LlmRequest): Promise<BaseLlmConnection>;
    private preprocessRequest;
}
