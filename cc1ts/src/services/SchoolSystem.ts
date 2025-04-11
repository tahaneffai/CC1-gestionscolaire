import { Student } from '../models/Student';
import { Course } from '../models/Course';
import { AdditionalService } from '../models/AdditionalService';
import { Teacher } from '../models/Teacher';
import { DatabaseService } from './DatabaseService';

export class SchoolSystem {
    private db: DatabaseService;
    private static instance: SchoolSystem;

    constructor() {
        this.db = new DatabaseService();
    }

    public static getInstance(): SchoolSystem {
        if (!SchoolSystem.instance) {
            SchoolSystem.instance = new SchoolSystem();
        }
        return SchoolSystem.instance;
    }

    public async initialize(): Promise<void> {
        await this.db.initialize();
    }

    // Student Management
    public async createStudent(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: Date,
        gradeLevel: number
    ): Promise<Student> {
        const student = new Student(id, firstName, lastName, email, dateOfBirth, gradeLevel);
        await this.db.saveStudent(student);
        return student;
    }

    public async deleteStudent(id: string): Promise<void> {
        await this.db.deleteStudent(id);
    }

    public async getStudentsByGrade(grade: number): Promise<Student[]> {
        return this.db.getStudentsByGrade(grade);
    }

    public async getAllStudents(): Promise<Student[]> {
        return this.db.getAllStudents();
    }

    // Course Management
    public async createCourse(
        id: string,
        name: string,
        subject: string,
        teacher: Teacher,
        schedule: string,
        classroom: string
    ): Promise<Course> {
        const course = new Course(id, name, subject, teacher, schedule, classroom);
        await this.db.saveCourse(course);
        return course;
    }

    public async deleteCourse(id: string): Promise<void> {
        await this.db.deleteCourse(id);
    }

    public async getCoursesBySubject(subject: string): Promise<Course[]> {
        return this.db.getCoursesBySubject(subject);
    }

    public async getAllCourses(): Promise<Course[]> {
        return this.db.getAllCourses();
    }

    // Service Management
    public createAdditionalService(
        id: string,
        name: string,
        type: string,
        schedule: string,
        location: string,
        capacity: number
    ): AdditionalService {
        const service = new AdditionalService(id, name, type, schedule, location, capacity);
        this.db.saveService(service);
        return service;
    }

    public deleteService(id: string): void {
        this.db.deleteService(id);
    }

    public getAvailableServices(): AdditionalService[] {
        return this.db.getAvailableServices();
    }

    // Statistics
    public async getStatistics(): Promise<{
        totalStudents: number;
        totalCourses: number;
        totalServices: number;
        totalTeachers: number;
    }> {
        const [students, courses, services] = await Promise.all([
            this.getAllStudents(),
            this.getAllCourses(),
            this.getAvailableServices(),
        ]);

        const uniqueTeachers = new Set(courses.map(course => course.teacher.id));

        return {
            totalStudents: students.length,
            totalCourses: courses.length,
            totalServices: services.length,
            totalTeachers: uniqueTeachers.size,
        };
    }
} 