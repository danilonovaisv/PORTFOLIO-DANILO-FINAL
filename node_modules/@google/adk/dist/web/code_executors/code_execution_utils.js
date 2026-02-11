/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Language, Outcome } from "@google/genai";
import { cloneDeep } from "lodash-es";
import { base64Encode, isBase64Encoded } from "../utils/env_aware_utils.js";
function getEncodedFileContent(data) {
  return isBase64Encoded(data) ? data : base64Encode(data);
}
function extractCodeAndTruncateContent(content, codeBlockDelimiters) {
  var _a;
  if (!((_a = content.parts) == null ? void 0 : _a.length)) {
    return "";
  }
  for (let i = 0; i < content.parts.length; i++) {
    const part = content.parts[i];
    if (part.executableCode && (i === content.parts.length - 1 || !content.parts[i + 1].codeExecutionResult)) {
      content.parts = content.parts.slice(0, i + 1);
      return part.executableCode.code;
    }
  }
  const textParts = content.parts.filter((part) => part.text);
  if (!textParts.length) {
    return "";
  }
  const firstTextPart = cloneDeep(textParts[0]);
  const responseText = textParts.map((part) => part.text).join("\n");
  const leadingDelimiterPattern = codeBlockDelimiters.map((d) => d[0]).join("|");
  const trailingDelimiterPattern = codeBlockDelimiters.map((d) => d[1]).join("|");
  const match = new RegExp(
    "?<prefix>.*?)(".concat(leadingDelimiterPattern, ")(?<codeStr>.*?)(").concat(trailingDelimiterPattern, ")(?<suffix>.*?)$"),
    "s"
  ).exec(responseText);
  const { prefix, codeStr } = (match == null ? void 0 : match.groups) || {};
  if (!codeStr) {
    return "";
  }
  content.parts = [];
  if (prefix) {
    firstTextPart.text = prefix;
    content.parts.push(firstTextPart);
  }
  content.parts.push(buildExecutableCodePart(codeStr));
  return codeStr;
}
function buildExecutableCodePart(code) {
  return {
    text: code,
    executableCode: {
      code,
      language: Language.PYTHON
    }
  };
}
function buildCodeExecutionResultPart(codeExecutionResult) {
  if (codeExecutionResult.stderr) {
    return {
      text: codeExecutionResult.stderr,
      codeExecutionResult: {
        outcome: Outcome.OUTCOME_FAILED
      }
    };
  }
  const finalResult = [];
  if (codeExecutionResult.stdout || !codeExecutionResult.outputFiles) {
    finalResult.push("Code execution result:\n".concat(codeExecutionResult.stdout, "\n"));
  }
  if (codeExecutionResult.outputFiles) {
    finalResult.push(
      "Saved artifacts:\n" + codeExecutionResult.outputFiles.map((f) => f.name).join(", ")
    );
  }
  return {
    text: finalResult.join("\n\n"),
    codeExecutionResult: {
      outcome: Outcome.OUTCOME_OK
    }
  };
}
function convertCodeExecutionParts(content, codeBlockDelimiter, executionResultDelimiters) {
  var _a;
  if (!((_a = content.parts) == null ? void 0 : _a.length)) {
    return;
  }
  const lastPart = content.parts[content.parts.length - 1];
  if (lastPart.executableCode) {
    content.parts[content.parts.length - 1] = {
      text: codeBlockDelimiter[0] + lastPart.executableCode.code + codeBlockDelimiter[1]
    };
  } else if (content.parts.length == 1 && lastPart.codeExecutionResult) {
    content.parts[content.parts.length - 1] = {
      text: executionResultDelimiters[0] + lastPart.codeExecutionResult.output + executionResultDelimiters[1]
    };
    content.role = "user";
  }
}
export {
  buildCodeExecutionResultPart,
  buildExecutableCodePart,
  convertCodeExecutionParts,
  extractCodeAndTruncateContent,
  getEncodedFileContent
};
