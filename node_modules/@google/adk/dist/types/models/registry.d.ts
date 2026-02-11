/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseLlm } from './base_llm.js';
/**
 * type[BaseLlm] equivalent in TypeScript, represents a class that can be new-ed
 * to create a BaseLlm instance.
 */
export type BaseLlmType = (new (params: {
    model: string;
}) => BaseLlm) & {
    readonly supportedModels: Array<string | RegExp>;
};
/**
 * Registry for LLMs.
 */
export declare class LLMRegistry {
    /**
     * Key is the regex that matches the model name.
     * Value is the class that implements the model.
     */
    private static llmRegistryDict;
    private static resolveCache;
    /**
     * Creates a new LLM instance.
     * @param model The model name.
     * @returns The LLM instance.
     */
    static newLlm(model: string): BaseLlm;
    private static _register;
    /**
     * Registers a new LLM class.
     * @param llmCls The class that implements the model.
     */
    static register<T extends BaseLlm>(llmCls: (new (params: {
        model: string;
    }) => T) & {
        readonly supportedModels: Array<string | RegExp>;
    }): void;
    /**
     * Resolves the model to a BaseLlm subclass.
     * @param model The model name.
     * @returns The BaseLlm subclass.
     * @throws If the model is not found.
     */
    static resolve(model: string): BaseLlmType;
}
