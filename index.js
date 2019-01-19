const getTvSeriesEpisodes = require('./getTvSeriesEpisodes');

return getTvSeriesEpisodes('west wing')
.then(results => {
  const { series, episodes } = results;
  const { seriesName } = series;

  episodes.forEach(episode => {
    const { airedSeason, airedEpisodeNumber, episodeName } = episode;

    console.log(`${seriesName} [${airedSeason}x${airedEpisodeNumber}] ${episodeName}`);
  });
});