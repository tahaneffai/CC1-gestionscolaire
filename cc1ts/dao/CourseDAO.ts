import { BaseDAO } from './BaseDAO';
import { Course } from '../models/Course';

export class CourseDAO extends BaseDAO<Course> {
    constructor() {
        super('SchoolDB', 'courses');
    }

    public async getCoursesBySubject(subject: string): Promise<Course[]> {
        const allCourses = await this.getAll();
        return allCourses.filter(course => course.subject === subject);
    }

    public async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
        const allCourses = await this.getAll();
        return allCourses.filter(course => course.teacher.id === teacherId);
    }

    public async getCoursesByResource(resourceId: string): Promise<Course[]> {
        const allCourses = await this.getAll();
        return allCourses.filter(course => 
            course.getRequiredResources().some(resource => resource.id === resourceId)
        );
    }
} 