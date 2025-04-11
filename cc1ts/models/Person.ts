export abstract class Person {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public dateOfBirth: Date
    ) {}

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
} 