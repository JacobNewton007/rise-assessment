#!/usr/bin/env sh

# Install new dependencies if any
npm install

# Uninstall the current bcrypt modules
npm uninstall bcrypt

# Install the bcrypt modules for the machine
npm install bcrypt

echo "Starting API server"

npm run dev
