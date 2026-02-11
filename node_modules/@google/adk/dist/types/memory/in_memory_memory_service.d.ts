/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Session } from '../sessions/session.js';
import { BaseMemoryService, SearchMemoryRequest, SearchMemoryResponse } from './base_memory_service.js';
/**
 * An in-memory memory service for prototyping purpose only.
 *
 * Uses keyword matching instead of semantic search.
 */
export declare class InMemoryMemoryService implements BaseMemoryService {
    private readonly memories;
    private readonly sessionEvents;
    addSessionToMemory(session: Session): Promise<void>;
    searchMemory(req: SearchMemoryRequest): Promise<SearchMemoryResponse>;
}
