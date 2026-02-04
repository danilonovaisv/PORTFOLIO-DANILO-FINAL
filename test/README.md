# Test Suite

This directory contains unit tests for various parts of the application.

## tsconfig.test.ts

This file contains tests that validate the TypeScript configuration in [tsconfig.json](../tsconfig.json). The tests ensure that:

- Compiler options are correctly set for the Next.js application
- Target ECMAScript version is properly configured
- JSX support is enabled with the correct settings
- Path mappings are correctly defined
- Library types include all necessary DOM and ES features
- Module resolution is set to 'bundler'
- Strict mode is enabled for better type safety
- Jest and Node types are included for testing
- Proper files are included and excluded

These tests help ensure consistency in the TypeScript configuration and prevent accidental changes that could break the build or development environment.
