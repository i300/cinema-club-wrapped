# Cinema Club Wrapped

A Spotify Wrapped-style year-in-review for your movie club, built with React and Vite.

## Getting Started

### Installation

```bash
npm install
```

### Running the App

The app works out of the box with pre-fetched TMDB data. No API key needed for normal use.

```bash
npm run dev
```

## Managing Movie Data

### Adding New Movies

1. Edit `src/data/movieList.js` and add your movie to the `movieList` array:
   ```javascript
   {
     title: "Inception",
     year: 2010,
     watchedDate: "2026-01-15",
     eventName: "Mind Bender Night",
     attendees: ["Jerry", "Nir", "Alex"]
   }
   ```

2. Create a `.env` file (copy from `.env.example`) and add your TMDB API key:
   ```bash
   cp .env.example .env
   # Edit .env and add: VITE_TMDB_API_KEY=your_key_here
   ```

3. Run the fetch script to get TMDB data for all movies:
   ```bash
   npm run fetch-tmdb
   ```

4. Commit both files to git:
   ```bash
   git add src/data/movieList.js src/data/enriched-movies.json
   git commit -m "Add new movie"
   ```

### Getting a TMDB API Key

1. Create a free account at [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Request an API key at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
3. Add to `.env`: `VITE_TMDB_API_KEY=your_key_here`

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run fetch-tmdb` - Fetch TMDB data for movies in movieList

## How It Works

This app uses pre-fetched data from The Movie Database (TMDB) to display movie statistics. The `fetch-tmdb` script runs on-demand to update the movie data, allowing the app to work completely offline without an API key once the data is fetched.

## Tech Stack

- React 19
- Vite
- Framer Motion
- Tailwind CSS
- TMDB API
