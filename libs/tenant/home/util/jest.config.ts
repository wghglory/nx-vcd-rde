/* eslint-disable */
export default {
  displayName: 'tenant-home-util',
  preset: '../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'html', 'js', 'json', 'mjs'],
  coverageReporters: ['lcov', 'json', 'text-summary'],
  collectCoverage: true,
  coverageDirectory: '../../../../coverage/libs/tenant/home/util',
};