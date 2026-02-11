/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { FunctionDeclaration } from '@google/genai';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseTool, RunAsyncToolRequest } from '../base_tool.js';
import { MCPSessionManager } from './mcp_session_manager.js';
/**
 * Represents a tool exposed via the Model Context Protocol (MCP).
 *
 * This class acts as a wrapper around a tool definition received from an MCP
 * server. It translates the MCP tool's schema into a format compatible with
 * the Gemini AI platform (FunctionDeclaration) and handles the remote
 * execution of the tool by communicating with the MCP server through an
 * {@link MCPSessionManager}.
 *
 * When an LLM decides to call this tool, the `runAsync` method will be
 * invoked, which in turn establishes an MCP session, sends a `callTool`
 * request with the provided arguments, and returns the result from the
 * remote tool.
 */
export declare class MCPTool extends BaseTool {
    private readonly mcpTool;
    private readonly mcpSessionManager;
    constructor(mcpTool: Tool, mcpSessionManager: MCPSessionManager);
    _getDeclaration(): FunctionDeclaration;
    runAsync(request: RunAsyncToolRequest): Promise<unknown>;
}
