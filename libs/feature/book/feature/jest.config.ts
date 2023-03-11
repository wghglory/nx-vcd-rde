/* eslint-disable */
export default {
  displayName: 'feature-book-feature',
  preset: '../../../../jest.preset.js',
  setupFilesAfterEnv: [
    '<rootDir>/src/test-setup.ts',
    '<rootDir>/../../../../node_modules/@hirez_io/observer-spy/dist/setup-auto-unsubscribe.js',
  ],
  globals: {},
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  coverageReporters: ['lcov', 'json', 'text-summary'],
  coverageDirectory: '../../../../coverage/libs/feature/book/feature',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleNameMapper: {
    '@cds/core/icon/(.*)$': '<rootDir>/../../../../node_modules/@cds/core/icon/index.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(@cds|@lit|lit|ramda|.*\\.mjs$))'], // ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
