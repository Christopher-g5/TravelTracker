import React, { useState } from "react";
import NewFlight from "./NewFlight";
import ListGroup from "react-bootstrap/ListGroup";
import { API, graphqlOperation } from "aws-amplify";
import { getByUid } from "../graphql/queries";

const getTripByUid = `query getTripByUid($uid:String!) {
  getByUid (uid: $uid)
  {
    items {
	    id
		uid
		departureDate
		fromCity
		toCity
	}

  }
}`;
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
    helper();
  };

  const helper = async () => {
    const idDetails = {
      uid: props.data,
    };
    console.log(props.data);
    try {
      const newTodo = await API.graphql(
        graphqlOperation(getTripByUid, idDetails)
      );
      const list = newTodo.data.getByUid.items;
      data = list;
      console.log(data);
    } catch (e) {
      console.log("Fetching error: ", e);
    }
  };

  var data = [
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
