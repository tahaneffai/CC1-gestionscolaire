import { BaseDAO } from './BaseDAO';
import { Student } from '../models/Student';

export class StudentDAO extends BaseDAO<Student> {
    constructor() {
        super('SchoolDB', 'students');
    }

    public async getStudentsByGrade(gradeLevel: number): Promise<Student[]> {
        const allStudents = await this.getAll();
        return allStudents.filter(student => student.gradeLevel === gradeLevel);
    }

    public async getStudentsByCourse(courseId: string): Promise<Student[]> {
        const allStudents = await this.getAll();
        return allStudents.filter(student => 
            student.getCourses().some(course => course.id === courseId)
        );
    }

    public async getStudentsByService(serviceId: string): Promise<Student[]> {
        const allStudents = await this.getAll();
        return allStudents.filter(student => 
            student.getServices().some(service => service.id === serviceId)
        );
    }
} 