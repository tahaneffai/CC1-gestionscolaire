export class Resource {
    constructor(
        public id: string,
        public name: string,
        public type: ResourceType,
        public location: string,
        public isAvailable: boolean = true
    ) {}

    reserve(): void {
        if (!this.isAvailable) {
            throw new Error(`Resource ${this.name} is not available`);
        }
        this.isAvailable = false;
    }

    release(): void {
        this.isAvailable = true;
    }
}

export enum ResourceType {
    CLASSROOM = 'CLASSROOM',
    EQUIPMENT = 'EQUIPMENT',
    SUPPLIES = 'SUPPLIES'
} 