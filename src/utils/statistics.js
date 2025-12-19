export const calculateStats = (movies) => {
  const totalMovies = movies.length;

  const totalRuntime = movies.reduce((sum, movie) => sum + movie.runtime, 0);
  const totalHours = Math.floor(totalRuntime / 60);
  const totalMinutes = totalRuntime % 60;

  const genreCounts = movies.reduce((acc, movie) => {
    acc[movie.genre] = (acc[movie.genre] || 0) + 1;
    return acc;
  }, {});
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0];

  const oldestMovie = movies.reduce((oldest, movie) =>
    movie.year < oldest.year ? movie : oldest
  );

  const newestMovie = movies.reduce((newest, movie) =>
    movie.year > newest.year ? movie : newest
  );

  const highestRated = movies.reduce((highest, movie) =>
    movie.rating > highest.rating ? movie : highest
  );

  const longestMovie = movies.reduce((longest, movie) =>
    movie.runtime > longest.runtime ? movie : longest
  );

  const directorCounts = movies.reduce((acc, movie) => {
    acc[movie.director] = (acc[movie.director] || 0) + 1;
    return acc;
  }, {});
  const topDirector = Object.entries(directorCounts).sort((a, b) => b[1] - a[1])[0];

  const decadeCounts = movies.reduce((acc, movie) => {
    const decade = Math.floor(movie.year / 10) * 10;
    acc[decade] = (acc[decade] || 0) + 1;
    return acc;
  }, {});

  const monthCounts = movies.reduce((acc, movie) => {
    const month = new Date(movie.watchedDate).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const ratingDistribution = movies.reduce((acc, movie) => {
    const ratingBucket = Math.floor(movie.rating);
    acc[ratingBucket] = (acc[ratingBucket] || 0) + 1;
    return acc;
  }, {});

  const averageRating = (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1);

  // Find the most attended event
  const mostAttendedEvent = movies.reduce((max, movie) =>
    movie.attendeeCount > max.attendeeCount ? movie : max
  );

  // Count attendee appearances
  const attendeeCounts = movies.reduce((acc, movie) => {
    movie.attendees.forEach(attendee => {
      acc[attendee] = (acc[attendee] || 0) + 1;
    });
    return acc;
  }, {});

  const topAttendee = Object.entries(attendeeCounts).sort((a, b) => b[1] - a[1])[0];

  // Count actor appearances by ID (for reliable deduplication)
  const actorCounts = movies.reduce((acc, movie) => {
    if (movie.cast && Array.isArray(movie.cast)) {
      movie.cast.forEach(actor => {
        if (!acc[actor.id]) {
          acc[actor.id] = {
            name: actor.name,
            count: 0,
            movies: [],
            popularity: actor.popularity || 0
          };
        }
        acc[actor.id].count++;
        acc[actor.id].movies.push(movie.title);
        // Keep the highest popularity value seen
        acc[actor.id].popularity = Math.max(acc[actor.id].popularity, actor.popularity || 0);
      });
    }
    return acc;
  }, {});

  // Get top 4 actors sorted by appearance count
  const topActorsByAppearance = Object.entries(actorCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 4)
    .map(([id, data]) => ({
      id,
      name: data.name,
      count: data.count,
      movies: data.movies,
      popularity: data.popularity
    }));

  // Check if any actors appear in 2+ movies
  const hasRepeatActors = topActorsByAppearance.length > 0 && topActorsByAppearance[0].count >= 2;

  // If no repeat actors, use popularity ranking instead
  let topActors;
  let actorRankingMode;

  if (hasRepeatActors) {
    topActors = topActorsByAppearance;
    actorRankingMode = 'appearances';
  } else {
    // Rank by popularity
    topActors = Object.entries(actorCounts)
      .sort((a, b) => b[1].popularity - a[1].popularity)
      .slice(0, 4)
      .map(([id, data]) => ({
        id,
        name: data.name,
        count: data.count,
        movies: data.movies,
        popularity: data.popularity
      }));
    actorRankingMode = 'popularity';
  }

  // Calculate total unique actors
  const totalUniqueActors = Object.keys(actorCounts).length;

  return {
    totalMovies,
    totalHours,
    totalMinutes,
    topGenre: topGenre ? { genre: topGenre[0], count: topGenre[1], percentage: Math.round((topGenre[1] / totalMovies) * 100) } : null,
    oldestMovie,
    newestMovie,
    highestRated,
    longestMovie,
    topDirector: topDirector ? { name: topDirector[0], count: topDirector[1] } : null,
    decadeCounts,
    monthCounts,
    ratingDistribution,
    averageRating,
    genreCounts,
    mostAttendedEvent,
    topAttendee: topAttendee ? { name: topAttendee[0], count: topAttendee[1] } : null,
    attendeeCounts,
    topActors,
    actorRankingMode,
    totalUniqueActors,
    actorCounts,
    movies
  };
};
