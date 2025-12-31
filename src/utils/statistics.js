import { ratings, userToName } from "../data/ratings";

// Helper function to get all valid reviews with calculated scores
const getValidReviews = (ratingsData, userToNameMap) => {
  const validReviews = [];

  ratingsData.forEach((movie) => {
    movie.reviews.forEach((review) => {
      // Filter: rating > 0 AND user in userToNameMap
      if (review.rating > 0 && review.user in userToNameMap) {
        const score = review.rating * (review.liked ? 1.2 : 1);
        validReviews.push({
          movieName: movie.movie_name,
          user: review.user,
          displayName: userToNameMap[review.user],
          rating: review.rating,
          liked: review.liked,
          score: score,
        });
      }
    });
  });

  return validReviews;
};

// Calculate metrics for each movie from reviews
const calculateMovieMetrics = (validReviews) => {
  const movieMap = {};

  validReviews.forEach((review) => {
    if (!movieMap[review.movieName]) {
      movieMap[review.movieName] = {
        movieName: review.movieName,
        scores: [],
        likeCount: 0,
        reviews: [],
      };
    }

    movieMap[review.movieName].scores.push(review.score);
    if (review.liked) {
      movieMap[review.movieName].likeCount++;
    }
    movieMap[review.movieName].reviews.push({
      displayName: review.displayName,
      rating: review.rating,
      score: review.score,
      liked: review.liked,
    });
  });

  // Calculate average scores
  const movieMetrics = {};
  Object.entries(movieMap).forEach(([movieName, movie]) => {
    const averageScore =
      movie.scores.reduce((sum, score) => sum + score, 0) / movie.scores.length;
    movieMetrics[movieName] = {
      averageScore,
      likeCount: movie.likeCount,
      totalReviews: movie.scores.length,
      reviews: movie.reviews,
    };
  });

  return movieMetrics;
};

// Calculate each person's most liked movie
const calculatePersonalFavorites = (validReviews, userToNameMap) => {
  const userFavorites = {};

  // Group reviews by user
  const userReviews = {};
  validReviews.forEach((review) => {
    if (!userReviews[review.user]) {
      userReviews[review.user] = [];
    }
    userReviews[review.user].push(review);
  });

  // Find highest score for each user
  Object.entries(userReviews).forEach(([user, reviews]) => {
    const favorite = reviews.reduce((best, current) =>
      current.score > best.score ? current : best
    );

    const displayName = userToNameMap[user];
    userFavorites[displayName] = {
      movieName: favorite.movieName,
      score: favorite.score,
      liked: favorite.liked,
    };
  });

  return userFavorites;
};

export const calculateStats = (movies) => {
  const totalMovies = movies.length;

  const totalRuntime = movies.reduce((sum, movie) => sum + movie.runtime, 0);
  const totalHours = Math.floor(totalRuntime / 60);
  const totalMinutes = totalRuntime % 60;

  const genreCounts = movies.reduce((acc, movie) => {
    const genres = movie.genres || [movie.genre];
    genres.forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });
    return acc;
  }, {});
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0];

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

  const averageRating = (
    movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
  ).toFixed(1);

  // Count attendee appearances
  const attendeeCounts = movies.reduce((acc, movie) => {
    movie.attendees.forEach((attendee) => {
      acc[attendee] = (acc[attendee] || 0) + 1;
    });
    return acc;
  }, {});

  const topAttendee = Object.entries(attendeeCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Calculate ratings stats
  const validReviews = getValidReviews(ratings, userToName);
  const movieMetrics = calculateMovieMetrics(validReviews);
  const personalFavorites = calculatePersonalFavorites(validReviews, userToName);

  // Create a map of movie names to standout reviews
  const standoutReviewMap = {};
  ratings.forEach((rating) => {
    if (rating.standout_review) {
      standoutReviewMap[rating.movie_name] = rating.standout_review;
    }
  });

  // Enrich movies with ratings data
  const enrichedMovies = movies.map((movie) => {
    const metrics = movieMetrics[movie.title] || {
      averageScore: 0,
      likeCount: 0,
      totalReviews: 0,
      reviews: [],
    };
    const standoutReview = standoutReviewMap[movie.title];
    return {
      ...movie,
      averageScore: metrics.averageScore,
      likeCount: metrics.likeCount,
      totalReviews: metrics.totalReviews,
      reviews: metrics.reviews,
      standoutReview: standoutReview,
    };
  });

  // Find movies with ratings for most/least liked
  const moviesWithRatings = enrichedMovies.filter((m) => m.totalReviews > 0);

  const mostLikedMovie =
    moviesWithRatings.length > 0
      ? moviesWithRatings.reduce((best, current) =>
          current.averageScore > best.averageScore ? current : best
        )
      : null;

  const leastLikedMovie =
    moviesWithRatings.length > 0
      ? moviesWithRatings.reduce((worst, current) =>
          current.averageScore < worst.averageScore ? current : worst
        )
      : null;

  // Find specific stats from enriched movies
  const oldestMovie = enrichedMovies.reduce((oldest, movie) =>
    movie.year < oldest.year ? movie : oldest
  );

  const newestMovie = enrichedMovies.reduce((newest, movie) =>
    movie.year > newest.year ? movie : newest
  );

  const highestRated = enrichedMovies.reduce((highest, movie) =>
    movie.rating > highest.rating ? movie : highest
  );

  const longestMovie = enrichedMovies.reduce((longest, movie) =>
    movie.runtime > longest.runtime ? movie : longest
  );

  const shortestMovie = enrichedMovies.reduce((shortest, movie) =>
    movie.runtime < shortest.runtime ? movie : shortest
  );

  const mostAttendedEvent = enrichedMovies.reduce((max, movie) =>
    movie.attendeeCount > max.attendeeCount ? movie : max
  );

  return {
    totalMovies,
    totalHours,
    totalMinutes,
    topGenre: topGenre
      ? {
          genre: topGenre[0],
          count: topGenre[1],
          percentage: Math.round((topGenre[1] / totalMovies) * 100),
        }
      : null,
    oldestMovie,
    newestMovie,
    highestRated,
    longestMovie,
    shortestMovie,
    decadeCounts,
    monthCounts,
    ratingDistribution,
    averageRating,
    genreCounts,
    mostAttendedEvent,
    topAttendee: topAttendee
      ? { name: topAttendee[0], count: topAttendee[1] }
      : null,
    attendeeCounts,
    movies: enrichedMovies,
    // Ratings stats (no longer nested)
    mostLikedMovie,
    leastLikedMovie,
    personalFavorites,
  };
};
