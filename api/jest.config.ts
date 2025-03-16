export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/__tests__/**/*.test.ts'],
  };
  