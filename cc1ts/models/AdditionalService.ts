export class AdditionalService {
    constructor(
        public id: string,
        public name: string,
        public type: ServiceType,
        public schedule: string,
        public location: string,
        public capacity: number,
        private enrolledStudents: Set<string> = new Set()
    ) {}

    enrollStudent(studentId: string): void {
        if (this.enrolledStudents.size >= this.capacity) {
            throw new Error(`Service ${this.name} is at full capacity`);
        }
        this.enrolledStudents.add(studentId);
    }

    unenrollStudent(studentId: string): void {
        this.enrolledStudents.delete(studentId);
    }

    getEnrolledStudentCount(): number {
        return this.enrolledStudents.size;
    }

    isStudentEnrolled(studentId: string): boolean {
        return this.enrolledStudents.has(studentId);
    }
}

export enum ServiceType {
    TUTORING = 'TUTORING',
    SPORTS = 'SPORTS',
    ARTS = 'ARTS',
    CLUBS = 'CLUBS'
} 