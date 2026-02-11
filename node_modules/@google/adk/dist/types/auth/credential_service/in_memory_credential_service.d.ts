/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ToolContext } from '../../tools/tool_context.js';
import { AuthCredential } from '../auth_credential.js';
import { AuthConfig } from '../auth_tool.js';
import { BaseCredentialService } from './base_credential_service.js';
/**
 * @experimental  (Experimental, subject to change) Class for in memory
 * implementation of credential service
 */
export declare class InMemoryCredentialService implements BaseCredentialService {
    private readonly credentials;
    loadCredential(authConfig: AuthConfig, toolContext: ToolContext): Promise<AuthCredential | undefined>;
    saveCredential(authConfig: AuthConfig, toolContext: ToolContext): Promise<void>;
    private getBucketForCurrentContext;
}
