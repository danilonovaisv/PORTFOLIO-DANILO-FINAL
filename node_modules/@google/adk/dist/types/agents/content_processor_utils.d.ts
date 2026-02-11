/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Content } from '@google/genai';
import { Event } from '../events/event.js';
/**
 * Get the contents for the LLM request.
 *
 * @param events: A list of all session events.
 * @param agentName: The name of the agent.
 * @param currentBranch: The current branch of the agent.
 *
 * @returns A list of processed contents.
 */
export declare function getContents(events: Event[], agentName: string, currentBranch?: string): Content[];
/**
 * Get contents for the current turn only (no conversation history).
 *
 * When include_contents='none', we want to include:
 * - The current user input
 * - Tool calls and responses from the current turn
 * But exclude conversation history from previous turns.
 *
 * In multi-agent scenarios, the "current turn" for an agent starts from an
 * actual user or from another agent.
 *
 * @param events: A list of all session events.
 * @param agentName: The name of the agent.
 * @param currentBranch: The current branch of the agent.
 *
 * @returns A list of contents for the current turn only, preserving context
 *     needed for proper tool execution while excluding conversation history.
 */
export declare function getCurrentTurnContents(events: Event[], agentName: string, currentBranch?: string): Content[];
