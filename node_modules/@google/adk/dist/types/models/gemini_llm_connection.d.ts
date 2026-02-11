/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Blob, Content, Session } from '@google/genai';
import { BaseLlmConnection } from './base_llm_connection.js';
import { LlmResponse } from './llm_response.js';
/** The Gemini model connection. */
export declare class GeminiLlmConnection implements BaseLlmConnection {
    private readonly geminiSession;
    constructor(geminiSession: Session);
    /**
     * Sends the conversation history to the gemini model.
     *
     * You call this method right after setting up the model connection.
     * The model will respond if the last content is from user, otherwise it will
     * wait for new user input before responding.
     *
     * @param history The conversation history to send to the model.
     */
    sendHistory(history: Content[]): Promise<void>;
    /**
     * Sends a user content to the gemini model.
     *
     * The model will respond immediately upon receiving the content.
     * If you send function responses, all parts in the content should be function
     * responses.
     *
     * @param content The content to send to the model.
     */
    sendContent(content: Content): Promise<void>;
    /**
     * Sends a chunk of audio or a frame of video to the model in realtime.
     *
     * @param blob The blob to send to the model.
     */
    sendRealtime(blob: Blob): Promise<void>;
    /**
     * Builds a full text response.
     *
     * The text should not be partial and the returned LlmResponse is not be
     * partial.
     *
     * @param text The text to be included in the response.
     * @returns An LlmResponse containing the full text.
     */
    private buildFullTextResponse;
    receive(): AsyncGenerator<LlmResponse, void, void>;
    /**
     * Closes the llm server connection.
     */
    close(): Promise<void>;
}
