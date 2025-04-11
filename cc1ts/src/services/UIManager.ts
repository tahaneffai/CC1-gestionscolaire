import { SchoolSystem } from './SchoolSystem';
import { Modal } from 'bootstrap';

export class UIManager {
    private schoolSystem: SchoolSystem;
    private activeSection: string = 'dashboard';

    constructor(schoolSystem: SchoolSystem) {
        this.schoolSystem = schoolSystem;
    }

    public initialize(): void {
        this.setupNavigation();
        this.setupForms();
        this.loadDashboard();
        this.loadAllData();
    }

    private setupNavigation(): void {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = (e.currentTarget as HTMLElement).dataset.section;
                if (section) {
                    this.showSection(section);
                }
            });
        });
    }

    private showSection(sectionId: string): void {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
            this.activeSection = sectionId;
            this.loadSectionData(sectionId);
        }
    }

    private setupForms(): void {
        this.setupStudentForm();
        this.setupCourseForm();
        this.setupServiceForm();
    }

    private setupStudentForm(): void {
        const form = document.getElementById('studentForm') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const student = await this.schoolSystem.createStudent(
                        (document.getElementById('studentId') as HTMLInputElement).value,
                        (document.getElementById('firstName') as HTMLInputElement).value,
                        (document.getElementById('lastName') as HTMLInputElement).value,
                        (document.getElementById('email') as HTMLInputElement).value,
                        new Date((document.getElementById('dateOfBirth') as HTMLInputElement).value),
                        parseInt((document.getElementById('gradeLevel') as HTMLInputElement).value)
                    );
                    this.closeModal('addStudentModal');
                    form.reset();
                    this.loadStudentsTable();
                    this.loadDashboard();
                } catch (error: any) {
                    alert(`Error creating student: ${error?.message || 'Unknown error'}`);
                }
            });
        }
    }

    private setupCourseForm(): void {
        const form = document.getElementById('courseForm') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const course = await this.schoolSystem.createCourse(
                        (document.getElementById('courseId') as HTMLInputElement).value,
                        (document.getElementById('courseName') as HTMLInputElement).value,
                        (document.getElementById('subject') as HTMLSelectElement).value,
                        {
                            id: (document.getElementById('teacherId') as HTMLInputElement).value,
                            firstName: '',
                            lastName: '',
                            email: '',
                            dateOfBirth: new Date(),
                            subject: (document.getElementById('subject') as HTMLSelectElement).value,
                            yearsOfExperience: 0
                        },
                        (document.getElementById('schedule') as HTMLInputElement).value,
                        (document.getElementById('classroom') as HTMLInputElement).value
                    );
                    this.closeModal('addCourseModal');
                    form.reset();
                    this.loadCoursesTable();
                    this.loadDashboard();
                } catch (error: any) {
                    alert(`Error creating course: ${error?.message || 'Unknown error'}`);
                }
            });
        }
    }

    private setupServiceForm(): void {
        const form = document.getElementById('serviceForm') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                try {
                    const service = this.schoolSystem.createAdditionalService(
                        (document.getElementById('serviceId') as HTMLInputElement).value,
                        (document.getElementById('serviceName') as HTMLInputElement).value,
                        (document.getElementById('serviceType') as HTMLSelectElement).value,
                        (document.getElementById('serviceSchedule') as HTMLInputElement).value,
                        (document.getElementById('serviceLocation') as HTMLInputElement).value,
                        parseInt((document.getElementById('capacity') as HTMLInputElement).value)
                    );
                    this.closeModal('addServiceModal');
                    form.reset();
                    this.loadServicesTable();
                    this.loadDashboard();
                } catch (error: any) {
                    alert(`Error creating service: ${error?.message || 'Unknown error'}`);
                }
            });
        }
    }

    private closeModal(modalId: string): void {
        const modalElement = document.getElementById(modalId);
        if (modalElement) {
            const modal = Modal.getInstance(modalElement);
            modal?.hide();
        }
    }

    private async loadSectionData(sectionId: string): Promise<void> {
        switch (sectionId) {
            case 'dashboard':
                await this.loadDashboard();
                break;
            case 'students':
                await this.loadStudentsTable();
                break;
            case 'courses':
                await this.loadCoursesTable();
                break;
            case 'services':
                await this.loadServicesTable();
                break;
        }
    }

    private async loadAllData(): Promise<void> {
        await Promise.all([
            this.loadStudentsTable(),
            this.loadCoursesTable(),
            this.loadServicesTable()
        ]);
    }

    private async loadDashboard(): Promise<void> {
        try {
            const stats = await this.schoolSystem.getStatistics();
            
            document.getElementById('totalStudents')!.textContent = stats.totalStudents.toString();
            document.getElementById('totalCourses')!.textContent = stats.totalCourses.toString();
            document.getElementById('totalServices')!.textContent = stats.totalServices.toString();
            document.getElementById('totalTeachers')!.textContent = stats.totalTeachers.toString();
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }

    private async loadStudentsTable(): Promise<void> {
        const tbody = document.querySelector('#studentsTable tbody');
        if (!tbody) return;

        try {
            const students = await this.schoolSystem.getAllStudents();
            tbody.innerHTML = '';
            
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.firstName} ${student.lastName}</td>
                    <td>${student.email}</td>
                    <td>${student.gradeLevel}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')">
                            Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading students:', error);
        }
    }

    private async loadCoursesTable(): Promise<void> {
        const tbody = document.querySelector('#coursesTable tbody');
        if (!tbody) return;

        try {
            const courses = await this.schoolSystem.getAllCourses();
            tbody.innerHTML = '';
            
            courses.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.id}</td>
                    <td>${course.name}</td>
                    <td>${course.subject}</td>
                    <td>${course.teacher.firstName} ${course.teacher.lastName}</td>
                    <td>${course.schedule}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteCourse('${course.id}')">
                            Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    }

    private async loadServicesTable(): Promise<void> {
        const tbody = document.querySelector('#servicesTable tbody');
        if (!tbody) return;

        try {
            const services = this.schoolSystem.getAvailableServices();
            tbody.innerHTML = '';
            
            services.forEach(service => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${service.id}</td>
                    <td>${service.name}</td>
                    <td>${service.type}</td>
                    <td>${service.schedule}</td>
                    <td>${service.location}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteService('${service.id}')">
                            Delete
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading services:', error);
        }
    }
} 