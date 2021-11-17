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
  const [data, setData] = useState({ trips: [] });

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

  var databaseList = [];

  const helper = async function () {
    const idDetails = {
      uid: props.data,
    };
    console.log(props.data);
    try {
      const newTodo = await API.graphql(
        graphqlOperation(getTripByUid, idDetails)
      );
      const list = newTodo.data.getByUid.items;
      databaseList = list;
      setFetchedData();
      //setData({ trips: list });
      //console.log(data);
    } catch (e) {
      console.log("Fetching error: ", e);
    }
  };

  const setFetchedData = () => {
    var aList = databaseList.map(
      (item) =>
        item.departureDate +
        ":    " +
        item.fromCity +
        "-----------> " +
        item.toCity
    );
    setData({ trips: aList });
  };

  // var data = [
  //   "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
  //   "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
  //   "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
  // ];

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
              {data.trips.map((item) => (
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
