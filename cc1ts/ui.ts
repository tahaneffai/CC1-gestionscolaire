import { schoolSystem } from './main.js';
import { Teacher } from './models/Teacher';
import { ServiceType } from './models/AdditionalService';
import { Student } from './models/Student';
import { Course } from './models/Course';
import { AdditionalService } from './models/AdditionalService';

// Global function to show sections
declare global {
    interface Window {
        showSection: (sectionId: string) => void;
    }
}

export function initializeUI() {
    // Initialize the system
    schoolSystem.initialize().catch(console.error);

    // Make showSection available globally
    window.showSection = (sectionId: string) => {
        // Hide all sections
        document.querySelectorAll('.data-display').forEach(section => {
            section.classList.remove('active');
        });
        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
    };

    // Load initial data
    loadStudents();
    loadCourses();
    loadServices();

    // Student form handling
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const student = await schoolSystem.createStudent(
                    (document.getElementById('studentId') as HTMLInputElement).value,
                    (document.getElementById('firstName') as HTMLInputElement).value,
                    (document.getElementById('lastName') as HTMLInputElement).value,
                    (document.getElementById('email') as HTMLInputElement).value,
                    new Date((document.getElementById('dateOfBirth') as HTMLInputElement).value),
                    parseInt((document.getElementById('gradeLevel') as HTMLInputElement).value)
                );
                alert(`Student ${student.fullName} created successfully!`);
                loadStudents(); // Refresh the students list
            } catch (error: any) {
                alert(`Error creating student: ${error?.message || 'Unknown error'}`);
            }
        });
    }

    // Course form handling
    const courseForm = document.getElementById('courseForm');
    if (courseForm) {
        courseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const teacher = new Teacher(
                    (document.getElementById('teacherId') as HTMLInputElement).value,
                    '', // firstName
                    '', // lastName
                    '', // email
                    new Date(), // dateOfBirth
                    (document.getElementById('subject') as HTMLSelectElement).value,
                    0 // yearsOfExperience
                );
                
                const course = await schoolSystem.createCourse(
                    (document.getElementById('courseId') as HTMLInputElement).value,
                    (document.getElementById('courseName') as HTMLInputElement).value,
                    (document.getElementById('subject') as HTMLSelectElement).value,
                    teacher,
                    (document.getElementById('schedule') as HTMLInputElement).value,
                    (document.getElementById('classroom') as HTMLInputElement).value
                );
                alert(`Course ${course.name} created successfully!`);
                loadCourses(); // Refresh the courses list
            } catch (error: any) {
                alert(`Error creating course: ${error?.message || 'Unknown error'}`);
            }
        });
    }

    // Service form handling
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                const serviceType = (document.getElementById('serviceType') as HTMLSelectElement).value as ServiceType;
                const service = schoolSystem.createAdditionalService(
                    (document.getElementById('serviceId') as HTMLInputElement).value,
                    (document.getElementById('serviceName') as HTMLInputElement).value,
                    serviceType,
                    (document.getElementById('serviceSchedule') as HTMLInputElement).value,
                    (document.getElementById('serviceLocation') as HTMLInputElement).value,
                    parseInt((document.getElementById('capacity') as HTMLInputElement).value)
                );
                alert(`Service ${service.name} created successfully!`);
                loadServices(); // Refresh the services list
            } catch (error: any) {
                alert(`Error creating service: ${error?.message || 'Unknown error'}`);
            }
        });
    }
}

async function loadStudents() {
    const studentsTable = document.getElementById('studentsTable')?.querySelector('tbody');
    if (!studentsTable) return;

    try {
        const students = await schoolSystem.getStudentsByGrade(0); // Get all students
        studentsTable.innerHTML = '';
        
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.email}</td>
                <td>${student.gradeLevel}</td>
                <td>
                    <button onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            `;
            studentsTable.appendChild(row);
        });
    } catch (error: any) {
        console.error('Error loading students:', error);
    }
}

async function loadCourses() {
    const coursesTable = document.getElementById('coursesTable')?.querySelector('tbody');
    if (!coursesTable) return;

    try {
        const courses = await schoolSystem.getCoursesBySubject(''); // Get all courses
        coursesTable.innerHTML = '';
        
        courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.id}</td>
                <td>${course.name}</td>
                <td>${course.subject}</td>
                <td>${course.teacher.fullName}</td>
                <td>${course.schedule}</td>
                <td>
                    <button onclick="deleteCourse('${course.id}')">Delete</button>
                </td>
            `;
            coursesTable.appendChild(row);
        });
    } catch (error: any) {
        console.error('Error loading courses:', error);
    }
}

async function loadServices() {
    const servicesTable = document.getElementById('servicesTable')?.querySelector('tbody');
    if (!servicesTable) return;

    try {
        const services = schoolSystem.getAvailableServices();
        servicesTable.innerHTML = '';
        
        services.forEach(service => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${service.id}</td>
                <td>${service.name}</td>
                <td>${service.type}</td>
                <td>${service.schedule}</td>
                <td>${service.location}</td>
                <td>
                    <button onclick="deleteService('${service.id}')">Delete</button>
                </td>
            `;
            servicesTable.appendChild(row);
        });
    } catch (error: any) {
        console.error('Error loading services:', error);
    }
}

// Make delete functions available globally
declare global {
    interface Window {
        deleteStudent: (id: string) => Promise<void>;
        deleteCourse: (id: string) => Promise<void>;
        deleteService: (id: string) => Promise<void>;
    }
}

window.deleteStudent = async (id: string) => {
    try {
        await schoolSystem.deleteStudent(id);
        loadStudents();
    } catch (error: any) {
        alert(`Error deleting student: ${error?.message || 'Unknown error'}`);
    }
};

window.deleteCourse = async (id: string) => {
    try {
        await schoolSystem.deleteCourse(id);
        loadCourses();
    } catch (error: any) {
        alert(`Error deleting course: ${error?.message || 'Unknown error'}`);
    }
};

window.deleteService = async (id: string) => {
    try {
        await schoolSystem.deleteService(id);
        loadServices();
    } catch (error: any) {
        alert(`Error deleting service: ${error?.message || 'Unknown error'}`);
    }
}; 