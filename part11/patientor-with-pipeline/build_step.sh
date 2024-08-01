#!/bin/bash

echo "Build script"

# Navigate to the client directory
cd client
npm install
npm run lint
npm run build

# Navigate back to the root directory
cd ..

# Navigate to the server directory
cd server
npm install
npm run lint
npm run build
