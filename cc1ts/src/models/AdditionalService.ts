export enum ServiceType {
    TUTORING = 'TUTORING',
    SPORTS = 'SPORTS',
    ARTS = 'ARTS',
    CLUBS = 'CLUBS'
}

export class AdditionalService {
    private enrolledStudents: Set<string>;

    constructor(
        public id: string,
        public name: string,
        public type: ServiceType,
        public schedule: string,
        public location: string,
        public capacity: number
    ) {
        this.enrolledStudents = new Set();
    }

    public enrollStudent(studentId: string): void {
        if (this.enrolledStudents.size >= this.capacity) {
            throw new Error(`Service ${this.name} is at full capacity`);
        }
        this.enrolledStudents.add(studentId);
    }

    public unenrollStudent(studentId: string): void {
        this.enrolledStudents.delete(studentId);
    }

    public getEnrolledStudentCount(): number {
        return this.enrolledStudents.size;
    }

    public isStudentEnrolled(studentId: string): boolean {
        return this.enrolledStudents.has(studentId);
    }
} 