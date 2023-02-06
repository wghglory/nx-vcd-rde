const { resolve } = require('path');
const { sync } = require('glob');
const { createCoverageMap } = require('istanbul-lib-coverage');
const { createContext } = require('istanbul-lib-report');
const { create } = require('istanbul-reports');

const coverageMap = createCoverageMap();

const coverageDir = resolve(__dirname, '../reports');
const reportFiles = sync(`${coverageDir}/e2e-report-*/coverage-final.json`);

reportFiles
  .map(reportFile => {
    return require(reportFile);
  })
  .forEach(report => coverageMap.merge(report));

const context = createContext({ coverageMap, dir: 'reports/e2e-combined-report' });

['lcov', 'json', 'html', 'text-summary'].forEach(reporter => {
  create(reporter, {}).execute(context);
});
