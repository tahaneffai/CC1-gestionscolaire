import { Teacher } from './Teacher';
import { Student } from './Student';
import { Resource } from './Resource';

export class Course {
    private enrolledStudents: Map<string, Student>;
    private requiredResources: Resource[];

    constructor(
        public id: string,
        public name: string,
        public subject: string,
        public teacher: Teacher,
        public schedule: string,
        public classroom: string
    ) {
        this.enrolledStudents = new Map();
        this.requiredResources = [];
    }

    public addStudent(student: Student): void {
        this.enrolledStudents.set(student.id, student);
        student.enrollInCourse(this);
    }

    public addRequiredResource(resource: Resource): void {
        this.requiredResources.push(resource);
    }

    public getEnrolledStudents(): Student[] {
        return Array.from(this.enrolledStudents.values());
    }

    public getRequiredResources(): Resource[] {
        return [...this.requiredResources];
    }
} 