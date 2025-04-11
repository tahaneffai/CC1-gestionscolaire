import { Person } from './Person';
import { Course } from './Course';
import { AdditionalService } from './AdditionalService';

export class Student extends Person {
    private enrolledCourses: Map<string, Course> = new Map();
    private additionalServices: Map<string, AdditionalService> = new Map();
    private grades: Map<string, number> = new Map();

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: Date,
        public gradeLevel: number
    ) {
        super(id, firstName, lastName, email, dateOfBirth);
    }

    enrollInCourse(course: Course): void {
        this.enrolledCourses.set(course.id, course);
    }

    addService(service: AdditionalService): void {
        this.additionalServices.set(service.id, service);
    }

    setGrade(courseId: string, grade: number): void {
        this.grades.set(courseId, grade);
    }

    getCourses(): Course[] {
        return Array.from(this.enrolledCourses.values());
    }

    getServices(): AdditionalService[] {
        return Array.from(this.additionalServices.values());
    }

    getGrade(courseId: string): number | undefined {
        return this.grades.get(courseId);
    }
} 