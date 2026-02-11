/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Content, FunctionCall } from '@google/genai';
import { InvocationContext } from '../agents/invocation_context.js';
import { Event } from '../events/event.js';
import { BaseTool } from '../tools/base_tool.js';
import { ToolConfirmation } from '../tools/tool_confirmation.js';
import { SingleAfterToolCallback, SingleBeforeToolCallback } from './llm_agent.js';
export declare const REQUEST_EUC_FUNCTION_CALL_NAME = "adk_request_credential";
export declare const REQUEST_CONFIRMATION_FUNCTION_CALL_NAME = "adk_request_confirmation";
export declare const functionsExportedForTestingOnly: {
    handleFunctionCallList: typeof handleFunctionCallList;
    generateAuthEvent: typeof generateAuthEvent;
    generateRequestConfirmationEvent: typeof generateRequestConfirmationEvent;
};
export declare function generateClientFunctionCallId(): string;
/**
 * Populates client-side function call IDs.
 *
 * It iterates through all function calls in the event and assigns a
 * unique client-side ID to each one that doesn't already have an ID.
 */
export declare function populateClientFunctionCallId(modelResponseEvent: Event): void;
/**
 * Removes the client-generated function call IDs from a given content object.
 *
 * When sending content back to the server, these IDs are
 * specific to the client-side and should not be included in requests to the
 * model.
 */
export declare function removeClientFunctionCallId(content: Content): void;
/**
 * Returns a set of function call ids of the long running tools.
 */
export declare function getLongRunningFunctionCalls(functionCalls: FunctionCall[], toolsDict: Record<string, BaseTool>): Set<string>;
/**
 * Generates an authentication event.
 *
 * It iterates through requested auth configurations in a function response
 * event and creates a new function call for each.
 */
export declare function generateAuthEvent(invocationContext: InvocationContext, functionResponseEvent: Event): Event | undefined;
/**
 * Generates a request confirmation event from a function response event.
 */
export declare function generateRequestConfirmationEvent({ invocationContext, functionCallEvent, functionResponseEvent, }: {
    invocationContext: InvocationContext;
    functionCallEvent: Event;
    functionResponseEvent: Event;
}): Event | undefined;
/**
 * Handles function calls.
 * Runtime behavior to pay attention to:
 * - Iterate through each function call in the `functionCallEvent`:
 *   - Execute before tool callbacks !!if a callback provides a response, short
 *     circuit the rest.
 *   - Execute the tool.
 *   - Execute after tool callbacks !!if a callback provides a response, short
 *     circuit the rest.
 *   - If the tool is long-running and the response is null, continue. !!state
 * - Merge all function response events into a single event.
 */
export declare function handleFunctionCallsAsync({ invocationContext, functionCallEvent, toolsDict, beforeToolCallbacks, afterToolCallbacks, filters, toolConfirmationDict, }: {
    invocationContext: InvocationContext;
    functionCallEvent: Event;
    toolsDict: Record<string, BaseTool>;
    beforeToolCallbacks: SingleBeforeToolCallback[];
    afterToolCallbacks: SingleAfterToolCallback[];
    filters?: Set<string>;
    toolConfirmationDict?: Record<string, ToolConfirmation>;
}): Promise<Event | null>;
/**
 * The underlying implementation of handleFunctionCalls, but takes a list of
 * function calls instead of an event.
 * This is also used by llm_agent execution flow in preprocessing.
 */
export declare function handleFunctionCallList({ invocationContext, functionCalls, toolsDict, beforeToolCallbacks, afterToolCallbacks, filters, toolConfirmationDict, }: {
    invocationContext: InvocationContext;
    functionCalls: FunctionCall[];
    toolsDict: Record<string, BaseTool>;
    beforeToolCallbacks: SingleBeforeToolCallback[];
    afterToolCallbacks: SingleAfterToolCallback[];
    filters?: Set<string>;
    toolConfirmationDict?: Record<string, ToolConfirmation>;
}): Promise<Event | null>;
/**
 * Merges a list of function response events into a single event.
 */
export declare function mergeParallelFunctionResponseEvents(functionResponseEvents: Event[]): Event;
