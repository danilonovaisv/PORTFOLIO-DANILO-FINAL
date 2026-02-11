/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ActivityEnd, ActivityStart, Blob, Content } from '@google/genai';
/**
 * Request sent to live agents.
 */
export interface LiveRequest {
    /** If set, send the content to the model in turn-by-turn mode. */
    content?: Content;
    /** If set, send the blob to the model in realtime mode. */
    blob?: Blob;
    /** If set, signal the start of user activity to the model. */
    activityStart?: ActivityStart;
    /** If set, signal the end of user activity to the model. */
    activityEnd?: ActivityEnd;
    /** If set, close the queue. */
    close?: boolean;
}
/**
 * Queue used to send LiveRequest in a live (bidirectional streaming) way.
 */
export declare class LiveRequestQueue {
    private readonly queue;
    private readonly resolveFnFifoQueue;
    private isClosed;
    /**
     * Adds a request to the queue. If there is a pending `get()` call, it
     * will be resolved with the given request.
     * @param req The request to send.
     */
    send(req: LiveRequest): void;
    /**
     * Retrieves a request from the queue. If the queue is empty, it will
     * wait until a request is available.
     * @returns A promise that resolves with the next available request.
     */
    get(): Promise<LiveRequest>;
    /**
     * Sends a close signal to the queue.
     */
    close(): void;
    /**
     * Sends a content object to the queue.
     * @param content The content to send.
     */
    sendContent(content: Content): void;
    /**
     * Sends a blob to the model in realtime mode.
     * @param blob The blob to send.
     */
    sendRealtime(blob: Blob): void;
    /**
     * Sends an activity start signal to mark the beginning of user input.
     */
    sendActivityStart(): void;
    /**
     * Sends an activity end signal to mark the end of user input.
     */
    sendActivityEnd(): void;
    /**
     * Implements the async iterator protocol.
     */
    [Symbol.asyncIterator](): AsyncGenerator<LiveRequest, void, undefined>;
}
