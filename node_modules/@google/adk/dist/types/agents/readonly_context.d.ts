/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Content } from '@google/genai';
import { State } from '../sessions/state.js';
import { InvocationContext } from './invocation_context.js';
/**
 * A readonly context represents the data of a single invocation of an agent.
 */
export declare class ReadonlyContext {
    readonly invocationContext: InvocationContext;
    constructor(invocationContext: InvocationContext);
    /**
     * The user content that started this invocation.
     */
    get userContent(): Content | undefined;
    /**
     * The current invocation id.
     */
    get invocationId(): string;
    /**
     * The current agent name.
     */
    get agentName(): string;
    /**
     * The state of the current session.
     */
    get state(): Readonly<State>;
}
