import parser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      '.firebase/**',
      'dataconnect-generated/**',
      'functions/lib/**',
      'functions/src/**',
      'functions/.eslintrc.js',
      'src/dataconnect-generated/**',
      'docs/**',
    ],
  },
  {
    files: [
      'app/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'components/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'src/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'lib/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'config/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'functions/src/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'pages/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'content/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'test/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'validations/**/*.{ts,tsx,js,jsx,mjs,cjs}',
      'middleware.ts',
      'tailwind.config.ts',
    ],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
