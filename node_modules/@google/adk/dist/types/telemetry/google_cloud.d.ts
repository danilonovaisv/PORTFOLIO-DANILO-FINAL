/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Resource } from '@opentelemetry/resources';
import { OtelExportersConfig, OTelHooks } from './setup.js';
export declare function getGcpExporters(config?: OtelExportersConfig): Promise<OTelHooks>;
export declare function getGcpResource(): Resource;
