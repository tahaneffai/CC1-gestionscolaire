# School Management System

A comprehensive school management system built with TypeScript and IndexedDB, featuring student enrollment, course management, resource allocation, and additional services.

## Features

- Student Management
  - Student enrollment and information tracking
  - Grade level management
  - Course enrollment tracking

- Course Management
  - Different types of courses (Math, Science, History)
  - Teacher assignment
  - Resource allocation
  - Schedule management

- Resource Management
  - Centralized resource management
  - Resource allocation and tracking
  - Availability management

- Additional Services
  - Tutoring services
  - Sports activities
  - Arts programs
  - Club management

## Technical Features

- TypeScript for type safety and better development experience
- IndexedDB for client-side data storage
- Factory Pattern for course creation
- Singleton Pattern for resource management
- DAO Pattern for data access
- Modular and maintainable architecture

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
├── models/           # Data models
├── dao/             # Data Access Objects
├── services/        # Business logic services
├── utils/           # Utility functions
├── main.ts          # Main application entry
├── index.html       # Web interface
├── package.json     # Project dependencies
└── tsconfig.json    # TypeScript configuration
```

## Usage

1. Open the application in your web browser
2. Use the forms to:
   - Add new students
   - Create courses
   - Manage additional services
   - Allocate resources

## Development

The system is built with modularity in mind, making it easy to extend and maintain. Key design patterns used include:

- Factory Pattern for course creation
- Singleton Pattern for resource management
- DAO Pattern for data access
- Observer Pattern for event handling

## Testing

Run tests using:
```bash
npm test
```

## License

MIT 
