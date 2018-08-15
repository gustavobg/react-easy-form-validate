module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/.docz/',
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
  ],
  testURL: 'http://localhost',
  verbose: true,
  moduleNameMapper: {
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^app/(.*)$': '<rootDir>/$1',
  },
};