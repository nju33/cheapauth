module.exports = {
  rootDir: '..',
  roots: ['<rootDir>/react-cheapauth/src', '<rootDir>/cheapauth-jest/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cheapauth-jest/extend-expect': '<rootDir>/cheapauth-jest/src/index.ts',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/react-cheapauth/tsconfig.json',
    },
  },
};
