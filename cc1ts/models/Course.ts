import { Teacher } from './Teacher';
import { Resource } from './Resource';
import { Student } from './Student';

export class Course {
    private enrolledStudents: Map<string, Student> = new Map();
    private requiredResources: Resource[] = [];

    constructor(
        public id: string,
        public name: string,
        public subject: string,
        public teacher: Teacher,
        public schedule: string,
        public classroom: string
    ) {}

    addStudent(student: Student): void {
        this.enrolledStudents.set(student.id, student);
        student.enrollInCourse(this);
    }

    addRequiredResource(resource: Resource): void {
        this.requiredResources.push(resource);
    }

    getEnrolledStudents(): Student[] {
        return Array.from(this.enrolledStudents.values());
    }

    getRequiredResources(): Resource[] {
        return [...this.requiredResources];
    }
} 