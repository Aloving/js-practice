module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/task-*/**/*.test.js', '**/task-*/**/*.test.ts'],
    collectCoverageFrom: [
        'task-*/**/*.js',
        'task-*/**/*.ts',
        '!**/node_modules/**',
        '!**/*.test.js',
        '!**/*.test.ts'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'json']
};

