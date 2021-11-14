import React, { useState } from "react";
import NewFlight from "./NewFlight";
import ListGroup from "react-bootstrap/ListGroup";

function TrackedFlights(uid) {
  const [showNewFlightPage, setNewFlightVisibility] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleNewFlightClick = () => {
    setNewFlightVisibility(true);
  };

  const fetchTrackedFlights = () => {
    return null;
  };

  const data = ["Hello", "There", "Friend"];

  return (
    <div>
      {showNewFlightPage ? (
        <NewFlight uid={uid} />
      ) : (
        <div>
          <h1>Tracked Flights</h1>
          <div>
            {fetchTrackedFlights}
            {data.map((item) => (
              <ListGroup.Item>{item}</ListGroup.Item>
            ))}
          </div>
          <button onClick={handleNewFlightClick}>+ Track a New Flight</button>
        </div>
      )}
    </div>
  );
}

export default TrackedFlights;
