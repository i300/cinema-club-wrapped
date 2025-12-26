import Slide from "../../Slide";

const MostAttendedEventSlide = ({ stats }) => {
  const event = stats.mostAttendedEvent;

  return (
    <Slide className="stat-slide bg-gradient-attended">
      <div className="slide-content">
        <p className="stat-label">Biggest turnout</p>
        <h1 className="stat-movie-title">{event.eventName}</h1>
        <h2 className="stat-number">{event.attendeeCount}</h2>
        <p className="stat-unit">attendees</p>
        <div className="flex flex-wrap gap-2 justify-center my-6">
          {event.attendees.map((name, index) => (
            <span
              key={index}
              className="bg-white/25 text-white px-4 py-2 rounded-[20px] font-semibold text-[0.95rem]"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="stat-detail">for {event.title}</p>
      </div>
    </Slide>
  );
};

export default MostAttendedEventSlide;
