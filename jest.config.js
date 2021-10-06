module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js'],
  testPathIgnorePatterns: ['./node_modules/'],
  collectCoverageFrom: [
    "src/services/**/*.js",
    "src/utils/**/*.js",
    "src/middleware/**/*.js",
  ],
  coverageReporters: [
    "lcov",
    "text"
  ]
};