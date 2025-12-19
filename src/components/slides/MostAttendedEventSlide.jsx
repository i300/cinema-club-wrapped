import Slide from '../Slide';

const MostAttendedEventSlide = ({ stats }) => {
  const event = stats.mostAttendedEvent;

  return (
    <Slide className="stat-slide most-attended-slide">
      <div className="slide-content">
        <p className="stat-label">Biggest turnout</p>
        <h1 className="stat-movie-title">{event.eventName}</h1>
        <h2 className="stat-number">{event.attendeeCount}</h2>
        <p className="stat-unit">attendees</p>
        <div className="attendee-list">
          {event.attendees.map((name, index) => (
            <span key={index} className="attendee-badge">{name}</span>
          ))}
        </div>
        <p className="stat-detail">for {event.title}</p>
      </div>
    </Slide>
  );
};

export default MostAttendedEventSlide;
