/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function appendInstructions(llmRequest, instructions) {
  if (!llmRequest.config) {
    llmRequest.config = {};
  }
  const newInstructions = instructions.join("\n\n");
  if (llmRequest.config.systemInstruction) {
    llmRequest.config.systemInstruction += "\n\n" + newInstructions;
  } else {
    llmRequest.config.systemInstruction = newInstructions;
  }
}
function appendTools(llmRequest, tools) {
  if (!(tools == null ? void 0 : tools.length)) {
    return;
  }
  const functionDeclarations = [];
  for (const tool of tools) {
    const declaration = tool._getDeclaration();
    if (declaration) {
      functionDeclarations.push(declaration);
      llmRequest.toolsDict[tool.name] = tool;
    }
  }
  if (functionDeclarations.length) {
    if (!llmRequest.config) {
      llmRequest.config = {};
    }
    if (!llmRequest.config.tools) {
      llmRequest.config.tools = [];
    }
    llmRequest.config.tools.push({ functionDeclarations });
  }
}
function setOutputSchema(llmRequest, schema) {
  if (!llmRequest.config) {
    llmRequest.config = {};
  }
  llmRequest.config.responseSchema = schema;
  llmRequest.config.responseMimeType = "application/json";
}
export {
  appendInstructions,
  appendTools,
  setOutputSchema
};
