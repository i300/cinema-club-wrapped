import Slide from '../Slide';

const EventListSlide = ({ stats }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Slide className="event-list-slide">
      <div className="slide-content">
        <h2 className="event-list-title">Your 2025 Cinema Club Events</h2>
        <div className="events-container">
          {stats.movies.map((movie, index) => (
            <div key={index} className="event-item">
              <div className="event-date">{formatDate(movie.watchedDate)}</div>
              <div className="event-details">
                <h3 className="event-name">{movie.eventName}</h3>
                <p className="event-movie">{movie.title}</p>
                <p className="event-attendees">
                  {movie.attendeeCount} {movie.attendeeCount === 1 ? 'person' : 'people'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default EventListSlide;
