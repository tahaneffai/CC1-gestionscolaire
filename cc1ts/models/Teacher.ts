import { Person } from './Person';
import { Course } from './Course';

export class Teacher extends Person {
    private assignedCourses: Map<string, Course> = new Map();

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: Date,
        public subject: string,
        public yearsOfExperience: number
    ) {
        super(id, firstName, lastName, email, dateOfBirth);
    }

    assignCourse(course: Course): void {
        this.assignedCourses.set(course.id, course);
    }

    getAssignedCourses(): Course[] {
        return Array.from(this.assignedCourses.values());
    }
} 