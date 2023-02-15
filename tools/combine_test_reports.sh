mkdir -p reports/combined-json
cp "apps/seed-e2e/coverage/coverage-final.json" "reports/combined-json/from-cypress.json"
cp "coverage/report/coverage-final.json" "reports/combined-json/from-jest.json"

npx nyc merge "reports/combined-json"
mv "coverage.json" "reports/combined-json/out.json"

npx nyc report --reporter html --reporter text-summary --reporter json-summary --temp-dir reports/combined-json --report-dir reports/combined-coverage
