/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseAgent } from '../agents/base_agent.js';
import { BasePlugin } from '../plugins/base_plugin.js';
import { Runner } from './runner.js';
export declare class InMemoryRunner extends Runner {
    constructor({ agent, appName, plugins, }: {
        agent: BaseAgent;
        appName?: string;
        plugins?: BasePlugin[];
    });
}
