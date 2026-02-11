/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { logger } from "../utils/logger.js";
import { Gemini } from "./google_llm.js";
class LRUCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = /* @__PURE__ */ new Map();
  }
  get(key) {
    const item = this.cache.get(key);
    if (item) {
      this.cache.delete(key);
      this.cache.set(key, item);
    }
    return item;
  }
  set(key, value) {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      const lruKey = this.cache.keys().next().value;
      if (lruKey !== void 0) {
        this.cache.delete(lruKey);
      }
    }
    this.cache.set(key, value);
  }
}
const _LLMRegistry = class _LLMRegistry {
  /**
   * Creates a new LLM instance.
   * @param model The model name.
   * @returns The LLM instance.
   */
  static newLlm(model) {
    return new (_LLMRegistry.resolve(model))({ model });
  }
  static _register(modelNameRegex, llmCls) {
    if (_LLMRegistry.llmRegistryDict.has(modelNameRegex)) {
      logger.info(
        `Updating LLM class for ${modelNameRegex} from ${_LLMRegistry.llmRegistryDict.get(modelNameRegex)} to ${llmCls}`
      );
    }
    _LLMRegistry.llmRegistryDict.set(modelNameRegex, llmCls);
  }
  /**
   * Registers a new LLM class.
   * @param llmCls The class that implements the model.
   */
  static register(llmCls) {
    for (const regex of llmCls.supportedModels) {
      _LLMRegistry._register(regex, llmCls);
    }
  }
  /**
   * Resolves the model to a BaseLlm subclass.
   * @param model The model name.
   * @returns The BaseLlm subclass.
   * @throws If the model is not found.
   */
  static resolve(model) {
    const cachedLlm = _LLMRegistry.resolveCache.get(model);
    if (cachedLlm) {
      return cachedLlm;
    }
    for (const [regex, llmClass] of _LLMRegistry.llmRegistryDict.entries()) {
      const pattern = new RegExp(
        `^${regex instanceof RegExp ? regex.source : regex}$`,
        regex instanceof RegExp ? regex.flags : void 0
      );
      if (pattern.test(model)) {
        _LLMRegistry.resolveCache.set(model, llmClass);
        return llmClass;
      }
    }
    throw new Error(`Model ${model} not found.`);
  }
};
/**
 * Key is the regex that matches the model name.
 * Value is the class that implements the model.
 */
_LLMRegistry.llmRegistryDict = /* @__PURE__ */ new Map();
_LLMRegistry.resolveCache = new LRUCache(32);
let LLMRegistry = _LLMRegistry;
LLMRegistry.register(Gemini);
export {
  LLMRegistry
};
