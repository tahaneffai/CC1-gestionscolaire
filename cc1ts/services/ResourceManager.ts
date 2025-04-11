import { Resource, ResourceType } from '../models/Resource';

export class ResourceManager {
    private static instance: ResourceManager;
    private resources: Map<string, Resource> = new Map();

    private constructor() {}

    public static getInstance(): ResourceManager {
        if (!ResourceManager.instance) {
            ResourceManager.instance = new ResourceManager();
        }
        return ResourceManager.instance;
    }

    public addResource(resource: Resource): void {
        this.resources.set(resource.id, resource);
    }

    public getResource(id: string): Resource | undefined {
        return this.resources.get(id);
    }

    public getAllResources(): Resource[] {
        return Array.from(this.resources.values());
    }

    public getResourcesByType(type: ResourceType): Resource[] {
        return Array.from(this.resources.values())
            .filter(resource => resource.type === type);
    }

    public reserveResource(id: string): void {
        const resource = this.getResource(id);
        if (!resource) {
            throw new Error(`Resource with ID ${id} not found`);
        }
        resource.reserve();
    }

    public releaseResource(id: string): void {
        const resource = this.getResource(id);
        if (!resource) {
            throw new Error(`Resource with ID ${id} not found`);
        }
        resource.release();
    }
} 