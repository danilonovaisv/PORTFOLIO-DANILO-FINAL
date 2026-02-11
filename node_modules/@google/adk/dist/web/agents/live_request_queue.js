var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __await = function(promise, isYieldStar) {
  this[0] = promise;
  this[1] = isYieldStar;
};
var __asyncGenerator = (__this, __arguments, generator) => {
  var resume = (k, v, yes, no) => {
    try {
      var x = generator[k](v), isAwait = (v = x.value) instanceof __await, done = x.done;
      Promise.resolve(isAwait ? v[0] : v).then((y) => isAwait ? resume(k === "return" ? k : "next", v[1] ? { done: y.done, value: y.value } : y, yes, no) : yes({ value: y, done })).catch((e) => resume("throw", e, yes, no));
    } catch (e) {
      no(e);
    }
  }, method = (k) => it[k] = (x) => new Promise((yes, no) => resume(k, x, yes, no)), it = {};
  return generator = generator.apply(__this, __arguments), it[__knownSymbol("asyncIterator")] = () => it, method("next"), method("throw"), method("return"), it;
};
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class LiveRequestQueue {
  constructor() {
    // Keeps track of the data that are waiting to be sent.
    this.queue = [];
    // Keeps track of the promises that are waiting for data.
    this.resolveFnFifoQueue = [];
    this.isClosed = false;
  }
  /**
   * Adds a request to the queue. If there is a pending `get()` call, it
   * will be resolved with the given request.
   * @param req The request to send.
   */
  send(req) {
    if (this.isClosed) {
      throw new Error("Cannot send to a closed queue.");
    }
    if (this.resolveFnFifoQueue.length > 0) {
      const resolve = this.resolveFnFifoQueue.shift();
      resolve(req);
    } else {
      this.queue.push(req);
    }
  }
  /**
   * Retrieves a request from the queue. If the queue is empty, it will
   * wait until a request is available.
   * @returns A promise that resolves with the next available request.
   */
  async get() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }
    if (this.isClosed) {
      return { close: true };
    }
    return new Promise((resolve) => {
      this.resolveFnFifoQueue.push(resolve);
    });
  }
  /**
   * Sends a close signal to the queue.
   */
  close() {
    if (this.isClosed) {
      return;
    }
    this.isClosed = true;
    while (this.resolveFnFifoQueue.length > 0 && this.queue.length > 0) {
      const resolve = this.resolveFnFifoQueue.shift();
      const req = this.queue.shift();
      resolve(req);
    }
    const closeRequest = { close: true };
    while (this.resolveFnFifoQueue.length > 0) {
      const resolve = this.resolveFnFifoQueue.shift();
      resolve(closeRequest);
    }
  }
  /**
   * Sends a content object to the queue.
   * @param content The content to send.
   */
  sendContent(content) {
    this.send({ content });
  }
  /**
   * Sends a blob to the model in realtime mode.
   * @param blob The blob to send.
   */
  sendRealtime(blob) {
    this.send({ blob });
  }
  /**
   * Sends an activity start signal to mark the beginning of user input.
   */
  sendActivityStart() {
    this.send({ activityStart: {} });
  }
  /**
   * Sends an activity end signal to mark the end of user input.
   */
  sendActivityEnd() {
    this.send({ activityEnd: {} });
  }
  /**
   * Implements the async iterator protocol.
   */
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, null, function* () {
      while (true) {
        const request = yield new __await(this.get());
        yield request;
        if (request.close) {
          break;
        }
      }
    });
  }
}
export {
  LiveRequestQueue
};
