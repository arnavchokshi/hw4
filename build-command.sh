#!/bin/bash
set -e

echo "Building React blockchain analysis app..."

# Install dependencies
npm install

# Build the React app
npm run build

echo "Build completed successfully!" 