import React from "react";

export function EventTable({ event }) {
  return (
    <div>
      <p>
        Event Name: <strong> {event.name.toUpperCase()} </strong>
      </p>
    </div>
  );
}

// export default EventTable;
