import { TMDB } from "tmdb-ts";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Get API key from environment
const API_KEY = process.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  console.error("Error: TMDB API key not found in environment variables");
  console.error("Please set VITE_TMDB_API_KEY in your .env file");
  process.exit(1);
}

// Initialize TMDB client
const tmdb = new TMDB(API_KEY);

// Number of cast members to analyze per movie
const CAST_ANALYSIS_DEPTH = 10;

// Import the movie list from the data file
// We need to use dynamic import since we're in an async context
const { movieList } = await import("../src/data/movieList.js");

console.log(`Starting TMDB data fetch for ${movieList.length} movies...\n`);

// TMDB API functions (mirroring tmdb.js service)
const searchMovie = async (title, year) => {
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
    console.error(`Error searching for movie: ${title}`, error.message);
    return null;
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const movie = await tmdb.movies.details(movieId, ["credits"]);
    return movie;
  } catch (error) {
    console.error(
      `Error getting movie details for ID: ${movieId}`,
      error.message
    );
    return null;
  }
};

// Fetch and enrich movie data
const enrichedMovies = [];
const failedMovies = [];

for (const movie of movieList) {
  try {
    console.log(`Fetching: ${movie.title} (${movie.year})...`);

    const searchResult = await searchMovie(movie.title, movie.year);

    if (!searchResult) {
      console.warn(`⚠️  No TMDB data found for: ${movie.title}`);
      failedMovies.push(movie.title);
      continue;
    }

    const details = await getMovieDetails(searchResult.id);

    if (!details) {
      console.warn(`⚠️  Failed to get details for: ${movie.title}`);
      failedMovies.push(movie.title);
      continue;
    }

    // Extract director
    const director = details.credits?.crew?.find(
      (person) => person.job === "Director"
    );

    // Extract genre
    const genre =
      details.genres && details.genres.length > 0
        ? details.genres[0].name
        : "Unknown";

    // Extract top cast members with popularity
    const topCast =
      details.credits?.cast?.slice(0, CAST_ANALYSIS_DEPTH).map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        popularity: actor.popularity,
      })) || [];

    // Merge TMDB data with original metadata
    enrichedMovies.push({
      // TMDB fields
      title: details.title,
      year: new Date(details.release_date).getFullYear(),
      genre,
      director: director ? director.name : "Unknown",
      runtime: details.runtime,
      rating: details.vote_average,
      posterPath: details.poster_path,
      backdropPath: details.backdrop_path,
      overview: details.overview,
      cast: topCast,

      // Original metadata
      watchedDate: movie.watchedDate,
      eventName: movie.eventName,
      attendees: movie.attendees,
      attendeeCount: movie.attendees.length,
    });

    console.log(`✓ ${movie.title}`);
  } catch (error) {
    console.error(`Error enriching ${movie.title}:`, error.message);
    failedMovies.push(movie.title);
  }
}

// Validate we got at least some data
if (enrichedMovies.length === 0) {
  console.error("\nError: Failed to enrich any movies");
  console.error("Please check your API key and internet connection");
  process.exit(1);
}

// Write to JSON file
const outputPath = path.resolve(__dirname, "../src/data/enriched-movies.json");

try {
  await fs.writeFile(
    outputPath,
    JSON.stringify(enrichedMovies, null, 2),
    "utf-8"
  );

  console.log(
    `\n✅ Successfully enriched ${enrichedMovies.length}/${movieList.length} movies`
  );

  if (failedMovies.length > 0) {
    console.log(`\n⚠️  Failed movies: ${failedMovies.join(", ")}`);
  }

  console.log(`\n📁 Data written to: ${outputPath}`);
} catch (error) {
  console.error("\nError writing to file:", error.message);
  process.exit(1);
}
