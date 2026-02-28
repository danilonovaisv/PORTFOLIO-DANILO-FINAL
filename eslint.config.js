import parser from '@typescript-eslint/parser';

// Try to load the Next.js ESLint plugin; fall back gracefully if not installed (e.g., offline)
const nextPluginModule =
  (await import('@next/eslint-plugin-next').catch(() => null)) ?? null;
const nextPlugin =
  (nextPluginModule && (nextPluginModule.default ?? nextPluginModule)) || null;
const nextCoreWebVitals = nextPlugin?.configs?.['core-web-vitals'];

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      '.firebase/**',
      'dataconnect-generated/**',
      'functions/**',
      'functions/lib/**',
      'functions/src/**',
      'functions/.eslintrc.js',
      'src/dataconnect-generated/**',
      'src/dataconnect-admin-generated/**',
      'docs/**',
      // Type definition files
      'src/lib/database.types.ts',
      'src/lib/supabase.types.ts',
      // Ghost files cleanup (appear in CI but deleted locally)
      'src/components/sobre/AboutBeliefs.tsx',
      'src/components/sobre/BeliefFixedHeader.tsx',
      // Utility scripts (standalone TS files not part of main build)
      'scripts/**',
      // Static/deployed assets (not source code)
      'public/**',
      'deploy-public/**',
      // SSR function generated code
      'ssr_function/**',
      // Subproject directories
      'portfoliodan/**',
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
    plugins: nextPlugin
      ? {
          '@next/next': nextPlugin,
        }
      : {},
    settings: nextCoreWebVitals?.settings ?? {},
    rules: {
      ...(nextCoreWebVitals?.rules ?? {}),
      'no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      'prefer-const': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
