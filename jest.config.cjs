const tsJestConfig = {
  useESM: true,
  tsconfig: {
    ignoreDeprecations: '5.0',
    jsx: 'react-jsx',
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
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(framer-motion)/)'],
  modulePathIgnorePatterns: [
    '<rootDir>/functions/',
    '<rootDir>/.firebase/',
    '<rootDir>/portfoliodan/',
    '<rootDir>/ssr_function/',
  ],
  testMatch: ['**/test/**/*.test.{ts,tsx,js}'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  cacheDirectory: '<rootDir>/.jest_cache',
};

module.exports = baseConfig;
