/* eslint-disable */
export default {
  displayName: 'provider-setting-util',
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
  moduleFileExtensions: ['ts', 'tsx', 'html', 'js', 'json', 'mjs'],
  coverageReporters: ['lcov', 'json', 'text-summary'],
  coverageDirectory: '../../../../coverage/libs/provider/setting/util',
};
