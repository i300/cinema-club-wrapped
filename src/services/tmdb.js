import { TMDB } from "tmdb-ts";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const tmdb = new TMDB(API_KEY);

export const searchMovie = async (title, year) => {
  try {
    const results = await tmdb.search.movies({
      query: title,
      year: year,
    });

    if (results.results && results.results.length > 0) {
      return results.results[0];
    }
    return null;
  } catch (error) {
    console.error(`Error searching for movie: ${title}`, error);
    return null;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const movie = await tmdb.movies.details(movieId, ["credits"]);
    return movie;
  } catch (error) {
    console.error(`Error getting movie details for ID: ${movieId}`, error);
    return null;
  }
};

export const enrichMovieData = async (
  movieTitle,
  year,
  watchedDate
) => {
  try {
    const searchResult = await searchMovie(movieTitle, year);

    if (!searchResult) {
      console.warn(`No TMDB data found for: ${movieTitle}`);
      return null;
    }

    const details = await getMovieDetails(searchResult.id);

    if (!details) {
      return null;
    }

    const director = details.credits?.crew?.find(
      (person) => person.job === "Director"
    );
    const genre =
      details.genres && details.genres.length > 0
        ? details.genres[0].name
        : "Unknown";

    return {
      title: details.title,
      year: new Date(details.release_date).getFullYear(),
      genre: genre,
      director: director ? director.name : "Unknown",
      runtime: details.runtime,
      rating: details.vote_average,
      watchedDate: watchedDate,
      posterPath: details.poster_path,
      backdropPath: details.backdrop_path,
      overview: details.overview,
    };
  } catch (error) {
    console.error(`Error enriching movie data for: ${movieTitle}`, error);
    return null;
  }
};
