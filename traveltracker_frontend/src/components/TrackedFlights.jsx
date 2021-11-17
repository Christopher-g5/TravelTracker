import React, { useState } from "react";
import NewFlight from "./NewFlight";
import ListGroup from "react-bootstrap/ListGroup";

function TrackedFlights(props) {
  const [showNewFlightPage, setNewFlightVisibility] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const submitHandler = () => {
    setNewFlightVisibility(true);
  };

  const handleClick = () => {
    setNewFlightVisibility(false);
  };

  const fetchTrackedFlights = () => {
    //DATABASE CODE

    console.log(props.data);
  };

  const data = [
    "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
    "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
    "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
  ];

  return (
    <div>
      {showNewFlightPage ? (
        <div>
          <NewFlight data={props.data} />
          <button onClick={handleClick}>Return to Tracked Flights</button>
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <div className="form-group"></div>
            <h1>Tracked Flights</h1>
            <div>
              {fetchTrackedFlights()}
              {data.map((item) => (
                <ListGroup.Item>{item}</ListGroup.Item>
              ))}
            </div>
            <input type="submit" value="+ Track a New Flight" />
          </div>
        </form>
      )}
    </div>
  );
}

export default TrackedFlights;
