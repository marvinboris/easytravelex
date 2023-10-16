import { readFile, writeFile } from 'fs';

import coverage from './coverage/coverage-summary.json';

const totalCoverage = coverage.total.lines.pct.toFixed(2);

readFile('./README.md', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const updatedData = data.replace(
    /!\[Coverage\]\(https:\/\/img\.shields\.io\/badge\/Coverage-(\d+(\.\d+)?)%25-(brightgreen|lightgrey)\.svg\)/,
    `![Coverage](https://img.shields.io/badge/Coverage-${totalCoverage}%25-brightgreen.svg)`,
  );

  writeFile('./README.md', updatedData, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('README file updated with test coverage.');
  });
});
