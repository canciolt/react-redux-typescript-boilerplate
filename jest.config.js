module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
    '^interfaces(.*)$': '<rootDir>/src/interfaces$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^mocks(.*)$': '<rootDir>/src/mocks$1',
    '^errors(.*)$': '<rootDir>/src/errors$1',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/test/enzyme.js'],
  testURL: 'http://127.0.0.1:8889',
};
