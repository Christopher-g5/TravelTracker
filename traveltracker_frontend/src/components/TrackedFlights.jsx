import React, { useState } from "react";
import NewFlight from "./NewFlight";

function TrackedFlights(uid) {
  const [showNewFlightPage, setNewFlightVisibility] = useState(false);

  const handleNewFlightClick = () => {
    setNewFlightVisibility(true);
  };

  return (
    <div>
      {showNewFlightPage ? (
        <NewFlight uid={uid} />
      ) : (
        <div>
          <h1>Tracked Flights</h1>
          <button onClick={handleNewFlightClick}>+ Track a New Flight</button>
        </div>
      )}
    </div>
  );
}

export default TrackedFlights;
