import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: [
      'node_modules/**',
      'lib/**',
      'generated/**',
      '.next/**',
      // Generated Next.js build output deployed as a Cloud Function – not source
      'next_build/**',
      'src/dataconnect-admin-generated/**',
      'src/dataconnect-generated/**',
      'src/dataconnect-*/**',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.dev.json'],
        sourceType: 'module',
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    rules: {
      quotes: ['error', 'single'],
      'import/no-unresolved': 0,
      indent: ['error', 2],
    },
  },
];
