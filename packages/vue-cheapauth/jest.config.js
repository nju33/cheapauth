module.exports = {
  rootDir: '..',
  roots: ['<rootDir>/vue-cheapauth/src', '<rootDir>/cheapauth-jest/src'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['vue', 'ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cheapauth-jest/extend-expect': '<rootDir>/cheapauth-jest/src/index.ts',
  },
};
