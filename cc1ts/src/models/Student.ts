import { Person } from './Person';
import { Course } from './Course';
import { AdditionalService } from './AdditionalService';

export class Student extends Person {
    private enrolledCourses: Map<string, Course>;
    private additionalServices: Map<string, AdditionalService>;
    private grades: Map<string, number>;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: Date,
        public gradeLevel: number
    ) {
        super(id, firstName, lastName, email, dateOfBirth);
        this.enrolledCourses = new Map();
        this.additionalServices = new Map();
        this.grades = new Map();
    }

    public enrollInCourse(course: Course): void {
        this.enrolledCourses.set(course.id, course);
    }

    public addService(service: AdditionalService): void {
        this.additionalServices.set(service.id, service);
    }

    public setGrade(courseId: string, grade: number): void {
        this.grades.set(courseId, grade);
    }

    public getCourses(): Course[] {
        return Array.from(this.enrolledCourses.values());
    }

    public getServices(): AdditionalService[] {
        return Array.from(this.additionalServices.values());
    }

    public getGrade(courseId: string): number | undefined {
        return this.grades.get(courseId);
    }
} 