/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FunctionCall, FunctionResponse } from '@google/genai';
import { LlmResponse } from '../models/llm_response.js';
import { EventActions } from './event_actions.js';
/**
 * Represents an event in a conversation between agents and users.

  It is used to store the content of the conversation, as well as the actions
  taken by the agents like function calls, etc.
 */
export interface Event extends LlmResponse {
    /**
     * The unique identifier of the event.
     * Do not assign the ID. It will be assigned by the session.
     */
    id: string;
    /**
     * The invocation ID of the event. Should be non-empty before appending to a
     * session.
     */
    invocationId: string;
    /**
     * "user" or the name of the agent, indicating who appended the event to the
     * session.
     */
    author?: string;
    /**
     * The actions taken by the agent.
     */
    actions: EventActions;
    /**
     * Set of ids of the long running function calls. Agent client will know from
     * this field about which function call is long running. Only valid for
     * function call event
     */
    longRunningToolIds?: string[];
    /**
     * The branch of the event.
     * The format is like agent_1.agent_2.agent_3, where agent_1 is the parent of
     * agent_2, and agent_2 is the parent of agent_3.
     *
     * Branch is used when multiple sub-agent shouldn't see their peer agents'
     * conversation history.
     */
    branch?: string;
    /**
     * The timestamp of the event.
     */
    timestamp: number;
}
/**
 * Creates an event from a partial event.
 *
 * @param params The partial event to create the event from.
 * @returns The event.
 */
export declare function createEvent(params?: Partial<Event>): Event;
/**
 * Returns whether the event is the final response of the agent.
 */
export declare function isFinalResponse(event: Event): boolean;
/**
 * Returns the function calls in the event.
 */
export declare function getFunctionCalls(event: Event): FunctionCall[];
/**
 * Returns the function responses in the event.
 */
export declare function getFunctionResponses(event: Event): FunctionResponse[];
/**
 * Returns whether the event has a trailing code execution result.
 */
export declare function hasTrailingCodeExecutionResult(event: Event): boolean;
/**
 * Extracts and concatenates all text from the parts of a `Event` object.
 * @param event The `Event` object to process.
 *
 * @returns A single string with the combined text.
 */
export declare function stringifyContent(event: Event): string;
/**
 * Generates a new unique ID for the event.
 */
export declare function createNewEventId(): string;
