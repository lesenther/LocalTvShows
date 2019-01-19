'use strict';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Handle the user input selection for a series name when the search
 * returns more than one result.
 *
 * @param {*} results
 * @param {*} resultsIndex
 * @param {*} resultsSize
 */
function promptForSeries(results, resultsIndex = 0, resultsSize = 10) {
  return new Promise((resolve, reject) => {
    if (!results) {
      return reject();
    }

    results.forEach((series, index) => {
      if (index >= resultsIndex && index < resultsIndex + resultsSize) {
        console.log(`   ${index + 1} - ${series.seriesName}`);
      }
    });

    rl.question(`Enter a number, 1-${results.length} (or j/k to navigate results):  `, input => {
      if (!isNaN(input) && (input > 0) && (input <= results.length)) {
        return resolve(input - 1);
      }

      // Navigation
      if (['j', 'k'].indexOf(input) !== -1) {
        resultsIndex = input === 'j'
        ? Math.min(resultsIndex + resultsSize, results.length - resultsSize)
        : Math.max(resultsIndex - resultsSize, 0);
      }

      return promptForSeries(results, resultsIndex, resultsSize)
      .then(resolve);
    });
  });
}

module.exports = promptForSeries;
