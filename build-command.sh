#!/bin/bash
set -e

echo "Building React blockchain analysis app..."

# Ensure we're using Node.js
node --version
npm --version

# Install dependencies
npm install

# Build the React app
npm run build

echo "Build completed successfully!" 