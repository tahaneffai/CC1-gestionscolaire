import { AdditionalService, ServiceType } from '../models/AdditionalService';
import { Student } from '../models/Student';
import { ResourceManager } from './ResourceManager';

export class AdditionalServiceManager {
    private static instance: AdditionalServiceManager;
    private services: Map<string, AdditionalService> = new Map();
    private resourceManager: ResourceManager;

    private constructor() {
        this.resourceManager = ResourceManager.getInstance();
    }

    public static getInstance(): AdditionalServiceManager {
        if (!AdditionalServiceManager.instance) {
            AdditionalServiceManager.instance = new AdditionalServiceManager();
        }
        return AdditionalServiceManager.instance;
    }

    public createService(
        id: string,
        name: string,
        type: ServiceType,
        schedule: string,
        location: string,
        capacity: number
    ): AdditionalService {
        const service = new AdditionalService(
            id,
            name,
            type,
            schedule,
            location,
            capacity
        );
        this.services.set(id, service);
        return service;
    }

    public deleteService(id: string): void {
        this.services.delete(id);
    }

    public getService(id: string): AdditionalService | undefined {
        return this.services.get(id);
    }

    public getAllServices(): AdditionalService[] {
        return Array.from(this.services.values());
    }

    public getServicesByType(type: ServiceType): AdditionalService[] {
        return Array.from(this.services.values())
            .filter(service => service.type === type);
    }

    public enrollStudentInService(serviceId: string, student: Student): void {
        const service = this.getService(serviceId);
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }

        service.enrollStudent(student.id);
        student.addService(service);
    }

    public unenrollStudentFromService(serviceId: string, student: Student): void {
        const service = this.getService(serviceId);
        if (!service) {
            throw new Error(`Service with ID ${serviceId} not found`);
        }

        service.unenrollStudent(student.id);
    }

    public getAvailableServices(): AdditionalService[] {
        return Array.from(this.services.values())
            .filter(service => service.getEnrolledStudentCount() < service.capacity);
    }
} 