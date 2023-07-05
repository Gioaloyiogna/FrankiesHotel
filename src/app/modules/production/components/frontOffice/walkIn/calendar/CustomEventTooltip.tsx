import React from 'react';

function CustomEventTooltip(props: { event: any; }) {
  const { event } = props;
  console.log("Hello World");
  return (
    <div className="custom-event-tooltip">
      <div className="event-subject">{event.Subject}</div>
      <div className="event-details">
        <div>Start Time: {event.StartTime.toLocaleString()}</div>
        <div>End Time: {event.EndTime.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default CustomEventTooltip;
