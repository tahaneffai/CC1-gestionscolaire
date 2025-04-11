import 'bootstrap';
import { SchoolSystem } from './services/SchoolSystem';
import { UIManager } from './services/UIManager';

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    const schoolSystem = new SchoolSystem();
    const uiManager = new UIManager(schoolSystem);

    try {
        await schoolSystem.initialize();
        uiManager.initialize();
        console.log('School Management System initialized successfully');
    } catch (error) {
        console.error('Failed to initialize the application:', error);
    }
}); 