import Slide from '../../Slide';
import './EventListSlide.css';

const EventListSlide = ({ stats }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPosterUrl = (posterPath) => {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  return (
    <Slide className="event-list-slide">
      <div className="slide-content">
        <h2 className="event-list-title">Your 2025 Cinema Club Events</h2>
        <div className="events-grid">
          {stats.movies.map((movie, index) => (
            <div key={index} className="event-grid-item">
              <div className="event-poster-wrapper">
                {movie.posterPath ? (
                  <img
                    src={getPosterUrl(movie.posterPath)}
                    alt={movie.title}
                    className="event-poster"
                  />
                ) : (
                  <div className="event-poster-placeholder">
                    {movie.title}
                  </div>
                )}
                <div className="event-overlay">
                  <div className="event-date">{formatDate(movie.watchedDate)}</div>
                  <h3 className="event-name">{movie.eventName}</h3>
                  <p className="event-movie">{movie.title}</p>
                  <p className="event-attendees">
                    {movie.attendeeCount} {movie.attendeeCount === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default EventListSlide;
