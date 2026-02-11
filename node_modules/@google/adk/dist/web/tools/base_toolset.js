/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class BaseToolset {
  constructor(toolFilter) {
    this.toolFilter = toolFilter;
  }
  /**
   * Returns whether the tool should be exposed to LLM.
   *
   * @param tool The tool to check.
   * @param context Context used to filter tools available to the agent.
   * @return Whether the tool should be exposed to LLM.
   */
  isToolSelected(tool, context) {
    if (!this.toolFilter) {
      return true;
    }
    if (typeof this.toolFilter === "function") {
      return this.toolFilter(tool, context);
    }
    if (Array.isArray(this.toolFilter)) {
      return this.toolFilter.includes(tool.name);
    }
    return false;
  }
  /**
   * Processes the outgoing LLM request for this toolset. This method will be
   * called before each tool processes the llm request.
   *
   * Use cases:
   * - Instead of let each tool process the llm request, we can let the toolset
   *   process the llm request. e.g. ComputerUseToolset can add computer use
   *   tool to the llm request.
   *
   * @param toolContext The context of the tool.
   * @param llmRequest The outgoing LLM request, mutable this method.
   */
  async processLlmRequest(toolContext, llmRequest) {
  }
}
export {
  BaseToolset
};
