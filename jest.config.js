module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/task-*/**/*.test.js', '**/task-*/**/*.test.ts', '**/task-*/**/*.test.tsx'],
    collectCoverageFrom: [
        'task-*/**/*.js',
        'task-*/**/*.ts',
        'task-*/**/*.tsx',
        '!**/node_modules/**',
        '!**/*.test.js',
        '!**/*.test.ts',
        '!**/*.test.tsx'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    projects: [
        {
            displayName: 'node',
            testMatch: ['**/task-*/**/*.test.js', '**/task-*/**/*.test.ts'],
            testEnvironment: 'node',
            preset: 'ts-jest',
            transform: {
                '^.+\\.ts$': 'ts-jest'
            },
            moduleFileExtensions: ['ts', 'js', 'json']
        },
        {
            displayName: 'jsdom',
            testMatch: ['**/task-*/**/*.test.tsx'],
            testEnvironment: 'jsdom',
            preset: 'ts-jest',
            transform: {
                '^.+\\.tsx$': ['ts-jest', {
                    tsconfig: {
                        jsx: 'react'
                    }
                }]
            },
            moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json'],
            setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
            moduleNameMapper: {
                '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
            }
        }
    ]
};
