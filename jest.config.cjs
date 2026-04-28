const tsJestConfig = {
  useESM: true,
  tsconfig: {
    jsx: 'react-jsx',
    rootDir: '.',
    ignoreDeprecations: '6.0',
    moduleResolution: 'bundler',
  },
};

const baseConfig = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', tsJestConfig],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    'server-only': '<rootDir>/test/__mocks__/serverOnlyMock.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(framer-motion)/)'],
  modulePathIgnorePatterns: [
    '<rootDir>/.agent/',
    '<rootDir>/functions/',
    '<rootDir>/.firebase/',
    '<rootDir>/.next/',
    '<rootDir>/portfoliodan/',
    '<rootDir>/ssr_function/',
    '<rootDir>/.claude/',
    '<rootDir>/backup-superpower/',
  ],
  testMatch: ['**/test/**/*.test.{ts,tsx,js}'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  cacheDirectory: '<rootDir>/.jest_cache',
};

module.exports = baseConfig;
