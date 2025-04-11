import { Student } from './models/Student';
import { Teacher } from './models/Teacher';
import { Resource, ResourceType } from './models/Resource';
import { Course } from './models/Course';
import { AdditionalService, ServiceType } from './models/AdditionalService';
import { CourseFactory } from './services/CourseFactory';
import { ResourceManager } from './services/ResourceManager';
import { AdditionalServiceManager } from './services/AdditionalServiceManager';
import { StudentDAO } from './dao/StudentDAO';
import { CourseDAO } from './dao/CourseDAO';

class SchoolManagementSystem {
    private studentDAO: StudentDAO;
    private courseDAO: CourseDAO;
    private courseFactory: CourseFactory;
    private resourceManager: ResourceManager;
    private additionalServiceManager: AdditionalServiceManager;

    constructor() {
        this.studentDAO = new StudentDAO();
        this.courseDAO = new CourseDAO();
        this.courseFactory = CourseFactory.getInstance();
        this.resourceManager = ResourceManager.getInstance();
        this.additionalServiceManager = AdditionalServiceManager.getInstance();
    }

    public async initialize(): Promise<void> {
        // Initialize resources
        this.initializeResources();
        
        // Load initial data
        await this.loadInitialData();
    }

    private initializeResources(): void {
        // Add some initial resources
        this.resourceManager.addResource(
            new Resource('math-calculator', 'Scientific Calculator', ResourceType.EQUIPMENT, 'Math Department', true)
        );
        this.resourceManager.addResource(
            new Resource('science-lab', 'Laboratory Equipment', ResourceType.EQUIPMENT, 'Science Department', true)
        );
        this.resourceManager.addResource(
            new Resource('history-projector', 'History Projector', ResourceType.EQUIPMENT, 'History Department', true)
        );
    }

    private async loadInitialData(): Promise<void> {
        // Load initial data from IndexedDB
        // This would typically be populated from a backend or initial setup
    }

    public async createStudent(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        dateOfBirth: Date,
        gradeLevel: number
    ): Promise<Student> {
        const student = new Student(id, firstName, lastName, email, dateOfBirth, gradeLevel);
        await this.studentDAO.save(student);
        return student;
    }

    public async deleteStudent(id: string): Promise<void> {
        await this.studentDAO.delete(id);
    }

    public async createCourse(
        id: string,
        name: string,
        subject: string,
        teacher: Teacher,
        schedule: string,
        classroom: string
    ): Promise<Course> {
        let course: Course;
        
        switch (subject.toLowerCase()) {
            case 'math':
                course = this.courseFactory.createMathCourse(id, name, teacher, schedule, classroom);
                break;
            case 'science':
                course = this.courseFactory.createScienceCourse(id, name, teacher, schedule, classroom);
                break;
            case 'history':
                course = this.courseFactory.createHistoryCourse(id, name, teacher, schedule, classroom);
                break;
            default:
                course = new Course(id, name, subject, teacher, schedule, classroom);
        }

        await this.courseDAO.save(course);
        return course;
    }

    public async deleteCourse(id: string): Promise<void> {
        await this.courseDAO.delete(id);
    }

    public createAdditionalService(
        id: string,
        name: string,
        type: ServiceType,
        schedule: string,
        location: string,
        capacity: number
    ): AdditionalService {
        return this.additionalServiceManager.createService(
            id,
            name,
            type,
            schedule,
            location,
            capacity
        );
    }

    public deleteService(id: string): void {
        this.additionalServiceManager.deleteService(id);
    }

    public enrollStudentInService(serviceId: string, student: Student): void {
        this.additionalServiceManager.enrollStudentInService(serviceId, student);
    }

    public getAvailableServices(): AdditionalService[] {
        return this.additionalServiceManager.getAvailableServices();
    }

    public getStudentsByGrade(gradeLevel: number): Promise<Student[]> {
        return this.studentDAO.getStudentsByGrade(gradeLevel);
    }

    public getCoursesBySubject(subject: string): Promise<Course[]> {
        return this.courseDAO.getCoursesBySubject(subject);
    }
}

// Export the system instance
export const schoolSystem = new SchoolManagementSystem();
