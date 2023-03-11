/* eslint-disable */
export default {
  displayName: 'feature-book-util',
  preset: '../../../../jest.preset.js',
  globals: {},
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageReporters: ['lcov', 'json', 'text-summary'],
  coverageDirectory: '../../../../coverage/libs/feature/book/util',
};
