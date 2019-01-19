const fs = require('fs');
const tvdb = require('node-tvdb');
const promptForSeries = require('./promptForSeries');

const { apiKey } = fs.existsSync('./private/keys.json') ? require('./private/keys.json') : { apiKey: false };
const tv = new tvdb(apiKey, 'en');

/**
 * Get all the episodes for a certain TV series.
 *
 * @param {string} searchTerm Name of the TV series to search for
 */
function getTvSeriesEpisodes(searchTerm) {
  return tv.getSeriesByName(searchTerm)
  .then(results => {
    if (results.length > 1) {
      console.log(`There were ${results.length} series `+
        `found matching the term "${searchTerm}":`);

      return promptForSeries(results)
      .then(index => results[index]);
    } else {
      return results[0];
    }
  })
  .then(series => {
    return tv.getEpisodesBySeriesId(series.id)
    .then(episodes => {
      return { series, episodes };
    });
  })
  .catch(e => {
    console.log(`Error:  ${e.message}`);
    return false;
  });
}

module.exports = getTvSeriesEpisodes;
