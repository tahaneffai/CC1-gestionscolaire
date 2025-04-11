import { Student } from '../models/Student';
import { Course } from '../models/Course';
import { AdditionalService } from '../models/AdditionalService';

export class DatabaseService {
    private db: IDBDatabase | null = null;
    private readonly DB_NAME = 'SchoolDB';
    private readonly DB_VERSION = 1;

    public async initialize(): Promise<void> {
        if (this.db) return;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create object stores
                if (!db.objectStoreNames.contains('students')) {
                    db.createObjectStore('students', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('courses')) {
                    db.createObjectStore('courses', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('services')) {
                    db.createObjectStore('services', { keyPath: 'id' });
                }
            };
        });
    }

    // Student operations
    public async saveStudent(student: Student): Promise<void> {
        return this.save('students', student);
    }

    public async deleteStudent(id: string): Promise<void> {
        return this.delete('students', id);
    }

    public async getAllStudents(): Promise<Student[]> {
        return this.getAll('students');
    }

    public async getStudentsByGrade(grade: number): Promise<Student[]> {
        const students = await this.getAllStudents();
        return students.filter(student => student.gradeLevel === grade);
    }

    // Course operations
    public async saveCourse(course: Course): Promise<void> {
        return this.save('courses', course);
    }

    public async deleteCourse(id: string): Promise<void> {
        return this.delete('courses', id);
    }

    public async getAllCourses(): Promise<Course[]> {
        return this.getAll('courses');
    }

    public async getCoursesBySubject(subject: string): Promise<Course[]> {
        const courses = await this.getAllCourses();
        return courses.filter(course => course.subject === subject);
    }

    // Service operations
    public async saveService(service: AdditionalService): Promise<void> {
        return this.save('services', service);
    }

    public async deleteService(id: string): Promise<void> {
        return this.delete('services', id);
    }

    public getAvailableServices(): AdditionalService[] {
        return this.getAll('services');
    }

    // Generic operations
    private async save(storeName: string, item: any): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(item);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    private async delete(storeName: string, id: string): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve();
        });
    }

    private async getAll(storeName: string): Promise<any[]> {
        if (!this.db) throw new Error('Database not initialized');

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
} 