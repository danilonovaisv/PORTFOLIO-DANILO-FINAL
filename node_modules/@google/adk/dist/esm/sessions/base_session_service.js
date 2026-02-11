/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { State } from "./state.js";
class BaseSessionService {
  /**
   * Appends an event to a session.
   *
   * @param request The request to append an event.
   * @return A promise that resolves to the event that was appended.
   */
  async appendEvent({ session, event }) {
    if (event.partial) {
      return event;
    }
    this.updateSessionState({ session, event });
    session.events.push(event);
    return event;
  }
  /**
   * Updates the session state based on the event.
   *
   * @param request The request to update the session state.
   */
  updateSessionState({ session, event }) {
    if (!event.actions || !event.actions.stateDelta) {
      return;
    }
    for (const [key, value] of Object.entries(event.actions.stateDelta)) {
      if (key.startsWith(State.TEMP_PREFIX)) {
        continue;
      }
      session.state[key] = value;
    }
  }
}
export {
  BaseSessionService
};
