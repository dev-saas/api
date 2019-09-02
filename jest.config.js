module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js', './test/global.js'],
  verbose: true,
  testEnvironment: 'node',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coverageReporters: ['lcov'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*-subscription.js'
  ]
}
