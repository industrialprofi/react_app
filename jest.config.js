const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './', // Path to the root of the Next.js app
})

// Jest configuration
const config = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/stories.tsx',
    '!src/**/*.d.ts',
    '!src/**/types.ts',
    '!src/mocks/**',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/.jest/setup.ts',
    '<rootDir>/jest.setup.js',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/mocks/(.*)$': '<rootDir>/src/mocks/$1',
    '^@/test-utils$': '<rootDir>/src/test-utils',
    '^@/test-utils/(.*)$': '<rootDir>/src/test-utils/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-markdown|vfile|vfile-message|markdown-table|unist-util-stringify-position|unified|bail|is-plain-obj|trough|trim-lines|property-information|hast-util-whitespace|space-separated-tokens|comma-separated-tokens|rehype-parse|hast-util-from-parse5|hast-util-parse-selector|hast-to-hyperscript|hast-util-to-parse5|hastscript|web-namespaces|zwitch|hast-util-raw)/)'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
    },
  },
}

module.exports = createJestConfig(config)
