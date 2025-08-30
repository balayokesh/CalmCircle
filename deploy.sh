#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Build the Angular project
ng build --configuration production --base-href "/CalmCircle/"

# Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/sandbox/browser
