module.exports = {
  rootDir: '.',
  roots: [
    '<rootDir>/packages/cheapauth-core/src',
    '<rootDir>/packages/react-cheapauth/src',
    '<rootDir>/packages/vue-cheapauth/src',
    '<rootDir>/packages/cheapauth-jest/src',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    'cheapauth-core': '<rootDir>/packages/cheapauth-core/src/index.ts',
    'cheapauth-jest/extend-expect': '<rootDir>/packages/cheapauth-jest/src/index.ts',
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json',
    },
  },
};
