module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js', './test/setup/global.js'],
  verbose: true,
  testEnvironment: 'node',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coverageReporters: ['lcov']
}
