const tsJestConfig = {
  useESM: true,
  tsconfig: {
    ignoreDeprecations: '5.0',
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
  },
  transformIgnorePatterns: ['node_modules/(?!(framer-motion)/)'],
  modulePathIgnorePatterns: ['<rootDir>/functions/'],
  testMatch: ['**/test/**/*.test.{ts,tsx,js}'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};

module.exports = baseConfig;
