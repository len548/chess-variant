// jest.config.cjs
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./src/setupTests.js'],
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest', // Transforms both .js/.jsx and .ts/.tsx files if needed
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
};
