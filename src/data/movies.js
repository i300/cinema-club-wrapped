import { enrichMovieData } from "../services/tmdb";

// List of movies watched with your club - includes event names and attendees
const movieList = [
  {
    title: "Game Night",
    year: 2018,
    watchedDate: "2025-01-30",
    eventName: "Cinema Club Round 1",
    attendees: ["Jerry", "Nir", "Alex", "Jojo", "Sam", "Tessa"],
  },
  {
    title: "Before Sunrise",
    year: 1995,
    watchedDate: "2025-02-25",
    eventName: "Cinema Club Round 2",
    attendees: ["Jerry", "Nir", "Alex", "Juliet", "Jojo", "Michael", "Sam"],
  },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    watchedDate: "2025-03-27",
    eventName: "Grand Cinema Club",
    attendees: [
      "Nir",
      "Jerry",
      "Jojo",
      "Michael",
      "Alex",
      "Tessa",
      "Brenna",
      "Zoe",
      "Sam",
    ],
  },
  {
    title: "Tag",
    year: 2018,
    watchedDate: "2025-04-22",
    eventName: "tag ur it ha ha movie night i guess",
    attendees: [
      "Jerry",
      "Nir",
      "Brenna",
      "Alex",
      "Jojo",
      "Michael",
      "Tessa",
      "Sam",
    ],
  },
  {
    title: "The Truman Show",
    year: 1998,
    watchedDate: "2025-05-20",
    eventName: "The Cinema Club Show",
    attendees: ["Nir", "Jerry", "Jojo", "Brenna", "Alex", "Tessa", "Sam"],
  },
  {
    title: "The Matrix",
    year: 1999,
    watchedDate: "2025-06-16",
    eventName: "www.whatisthematrix.com",
    attendees: [
      "Jerry",
      "Nir",
      "Alex",
      "Michael",
      "Jojo",
      "Brenna",
      "Juliet",
      "Sam",
      "Tessa",
    ],
  },
  {
    title: "What We Do in the Shadows",
    year: 2014,
    watchedDate: "2025-07-07",
    eventName: "Cinema Club in the Shadows",
    attendees: [
      "Jerry",
      "Zoe",
      "Tessa",
      "Juliet",
      "Jojo",
      "Brenna",
      "Nir",
      "Sam",
      "Alex",
    ],
  },
  {
    title: "Wolfwalkers",
    year: 2020,
    watchedDate: "2025-08-26",
    eventName: "Moviewatchers",
    attendees: [
      "Jerry",
      "Nir",
      "Brenna",
      "Alex",
      "Jojo",
      "Juliet",
      "Michael",
      "Sam",
      "Tessa",
    ],
  },
  {
    title: "Tetris",
    year: 2023,
    watchedDate: "2025-09-30",
    eventName: "four tennis",
    attendees: [
      "Zoe",
      "Nir",
      "Jerry",
      "Brenna",
      "Alex",
      "Juliet",
      "Michael",
      "Tessa",
    ],
  },
  {
    title: "Escape from New York",
    year: 1981,
    watchedDate: "2025-10-28",
    eventName: "Escape from Cinema Club",
    attendees: [
      "Nir",
      "Michael",
      "Alex",
      "Jerry",
      "Brenna",
      "Zoe",
      "Jojo",
      "Sam",
    ],
  },
  {
    title: "The Big Short",
    year: 2015,
    watchedDate: "2025-11-18",
    eventName: "The Big Cinema Club",
    attendees: [
      "Jerry",
      "Zoe",
      "Alex",
      "Juliet",
      "Brenna",
      "Jojo",
      "Laura",
      "Eric",
      "Sam",
    ],
  },
  {
    title: "Hedda",
    year: 2025,
    watchedDate: "2025-12-16",
    eventName: "Important night for me but also for you",
    attendees: [
      "Jerry",
      "Nir",
      "Alex",
      "Michael",
      "Juliet",
      "Jojo",
      "Brenna",
      "Sam",
    ],
  },
];

export const fetchMovies = async () => {
  const enrichedMovies = await Promise.all(
    movieList.map(async (movie) => {
      const enriched = await enrichMovieData(
        movie.title,
        movie.year,
        movie.watchedDate
      );

      if (enriched) {
        return {
          ...enriched,
          eventName: movie.eventName,
          attendees: movie.attendees,
          attendeeCount: movie.attendees.length,
        };
      }
      return null;
    })
  );

  return enrichedMovies.filter((movie) => movie !== null);
};
