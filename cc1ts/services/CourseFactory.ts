import { Course } from '../models/Course';
import { Teacher } from '../models/Teacher';
import { ResourceManager } from './ResourceManager';

export class CourseFactory {
    private static instance: CourseFactory;
    private resourceManager: ResourceManager;

    private constructor() {
        this.resourceManager = ResourceManager.getInstance();
    }

    public static getInstance(): CourseFactory {
        if (!CourseFactory.instance) {
            CourseFactory.instance = new CourseFactory();
        }
        return CourseFactory.instance;
    }

    public createMathCourse(
        id: string,
        name: string,
        teacher: Teacher,
        schedule: string,
        classroom: string
    ): Course {
        const course = new Course(id, name, 'Math', teacher, schedule, classroom);
        this.setupMathResources(course);
        return course;
    }

    public createScienceCourse(
        id: string,
        name: string,
        teacher: Teacher,
        schedule: string,
        classroom: string
    ): Course {
        const course = new Course(id, name, 'Science', teacher, schedule, classroom);
        this.setupScienceResources(course);
        return course;
    }

    public createHistoryCourse(
        id: string,
        name: string,
        teacher: Teacher,
        schedule: string,
        classroom: string
    ): Course {
        const course = new Course(id, name, 'History', teacher, schedule, classroom);
        this.setupHistoryResources(course);
        return course;
    }

    private setupMathResources(course: Course): void {
        const calculator = this.resourceManager.getResource('math-calculator');
        if (calculator) {
            course.addRequiredResource(calculator);
        }
    }

    private setupScienceResources(course: Course): void {
        const labEquipment = this.resourceManager.getResource('science-lab');
        if (labEquipment) {
            course.addRequiredResource(labEquipment);
        }
    }

    private setupHistoryResources(course: Course): void {
        const projector = this.resourceManager.getResource('history-projector');
        if (projector) {
            course.addRequiredResource(projector);
        }
    }
} 