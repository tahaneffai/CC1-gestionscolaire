const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Copy HTML file
fs.copyFileSync('index.html', 'dist/index.html');

// Compile TypeScript files
exec('npx tsc', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error compiling TypeScript: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`TypeScript compilation warnings: ${stderr}`);
    }
    console.log('TypeScript compilation successful');
}); 