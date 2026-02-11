/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Part } from '@google/genai';
import { BaseArtifactService, DeleteArtifactRequest, ListArtifactKeysRequest, ListVersionsRequest, LoadArtifactRequest, SaveArtifactRequest } from './base_artifact_service.js';
export declare class GcsArtifactService implements BaseArtifactService {
    private readonly bucket;
    constructor(bucket: string);
    saveArtifact(request: SaveArtifactRequest): Promise<number>;
    loadArtifact(request: LoadArtifactRequest): Promise<Part | undefined>;
    listArtifactKeys(request: ListArtifactKeysRequest): Promise<string[]>;
    deleteArtifact(request: DeleteArtifactRequest): Promise<void>;
    listVersions(request: ListVersionsRequest): Promise<number[]>;
}
