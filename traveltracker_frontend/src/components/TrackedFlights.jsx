import React, { useState } from "react";
import NewFlight from "./NewFlight";
import ListGroup from "react-bootstrap/ListGroup";
import { API, graphqlOperation } from 'aws-amplify';
import { getByUid } from '../graphql/queries';


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


  const handleNewFlightClick = () => {
    setNewFlightVisibility(true);
  };

  const fetchTrackedFlights = () => {
    //DATABASE CODE
	helper(); 
  };

  const helper = async () => {
    const idDetails = {
    uid: props.data
    };
	console.log(props.data);
		try {
			const newTodo = await API.graphql(graphqlOperation(getTripByUid, idDetails));
			const list = newTodo.data.getByUid.items;
			data = list; 
			console.log(data);
		} catch (e) {
			console.log('Fetching error: ', e);
		}
  
  }

  var data = [
    "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
    "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
    "DATE:     SFO (Departing Airport)    -------------------->       SEA  (Arriving Airport)",
  ];

  return (
    <div>
      {showNewFlightPage ? (
        <NewFlight data={props.data} />
      ) : (
        <div>
          <h1>Tracked Flights</h1>
          <div>
            {fetchTrackedFlights()}
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
