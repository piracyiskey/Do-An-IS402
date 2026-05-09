// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the MIT License.

export interface ModelBindingData {
    content?: Buffer | null;
    contentType?: string | null;
    source?: string | null;
    version?: string | null;
}

export type ResourceFactory = (modelBindingData: ModelBindingData | ModelBindingData[]) => unknown;

export class ResourceFactoryResolver {
    private constructor();
    static getInstance(): ResourceFactoryResolver;
    registerResourceFactory(resourceType: string, factory: ResourceFactory): void;
    unregisterResourceFactory(resourceType: string): void;
    createClient(resourceType: string | null | undefined, modelBindingData: unknown): unknown;
    hasResourceFactory(resourceType: string): boolean;
}
