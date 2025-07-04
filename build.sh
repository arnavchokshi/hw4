#!/bin/bash

# Build script for React app - ignore Python files
echo "Building React blockchain analysis app..."

# Install Node.js dependencies
npm install

# Build the React app
npm run build

echo "Build completed successfully!" 