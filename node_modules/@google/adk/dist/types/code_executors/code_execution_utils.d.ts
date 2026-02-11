/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Content, Part } from '@google/genai';
/**
 * A structure that contains a file name and its content
 */
export interface File {
    /**
     * The name of the file with file extension(e.g., ' file.csv')
     * */
    name: string;
    /**
     * The base64 - encoded bytes of the file content.
     * */
    content: string;
    /**
     * The mime type of the file (e.g., ' image / png')
     * */
    mimeType: string;
}
/**
 * A structure that contains the input of code execution.
 * */
export interface CodeExecutionInput {
    /**
     * The code to execute.
     * */
    code: string;
    /**
     * The input files available to the code.
     * */
    inputFiles: File[];
    /**
     * The execution ID for the stateful code execution.
     * */
    executionId?: string;
}
/**
 * A structure that contains the result of code execution.
 * */
export interface CodeExecutionResult {
    /**
     * The standard output of the code execution.
     * */
    stdout: string;
    /**
     * The standard error of the code execution.
     * */
    stderr: string;
    /**
     * The output files from the code execution.
     * */
    outputFiles: File[];
}
/**
 * Gets the file content as a base64-encoded bytes.
 *
 * @param data The file content bytes.
 * @return The file content as a base64-encoded bytes.
 */
export declare function getEncodedFileContent(data: string): string;
/**
 * Extracts the first code block from the content and truncate everything after
 * it.
 *
 * @param content The mutable content to extract the code from.
 * @param codeBlockDelimiters The list of the enclosing delimiters to identify
 *     the code blocks.
 * @return The first code block if found, otherwise None.
 */
export declare function extractCodeAndTruncateContent(content: Content, codeBlockDelimiters: Array<[string, string]>): string;
/**
 * Builds an executable code part with code string.
 *
 * @param code The code string.
 * @return The constructed executable code part.
 */
export declare function buildExecutableCodePart(code: string): Part;
/**
 * Builds the code execution result part from the code execution result.
 *
 * @param codeExecutionResult The code execution result.
 * @return The code execution result part.
 */
export declare function buildCodeExecutionResultPart(codeExecutionResult: CodeExecutionResult): Part;
/**
 * Converts the code execution parts to text parts in a Content.
 *
 * @param content The mutable content to convert the code execution parts to
 *     text parts.
 * @param codeBlockDelimiter The delimiter to format the code block.
 * @param executionResultDelimiters The delimiter to format the code execution
 *     result.
 * @return The converted content.
 */
export declare function convertCodeExecutionParts(content: Content, codeBlockDelimiter: [string, string], executionResultDelimiters: [string, string]): void;
