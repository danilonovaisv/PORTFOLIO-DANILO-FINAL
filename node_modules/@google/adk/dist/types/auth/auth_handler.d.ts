/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { State } from '../sessions/state.js';
import { AuthCredential } from './auth_credential.js';
import { AuthConfig } from './auth_tool.js';
/**
 * A handler that handles the auth flow in Agent Development Kit to help
 * orchestrates the credential request and response flow (e.g. OAuth flow)
 * This class should only be used by Agent Development Kit.
 */
export declare class AuthHandler {
    private readonly authConfig;
    constructor(authConfig: AuthConfig);
    getAuthResponse(state: State): AuthCredential | undefined;
    generateAuthRequest(): AuthConfig;
    /**
     * Generates an response containing the auth uri for user to sign in.
     *
     * @return An AuthCredential object containing the auth URI and state.
     * @throws Error: If the authorization endpoint is not configured in the
     *     auth scheme.
     */
    generateAuthUri(): AuthCredential | undefined;
}
