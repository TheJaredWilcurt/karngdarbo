module.exports = {
  globals: {
    'nw': true
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFiles: [
    './tests/setup.js'
  ],
  snapshotSerializers: [
    './tests/serializer.js'
  ],
  testMatch: [
    '**/tests/unit/**/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  coveragePathIgnorePatterns: [
    '/tests/'
  ],
  testURL: 'http://localhost/'
};
