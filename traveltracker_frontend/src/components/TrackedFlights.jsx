import React, { useState } from "react";
import NewFlight from "./NewFlight";
import ListGroup from "react-bootstrap/ListGroup";
import { API, graphqlOperation } from "aws-amplify";
import Graph from "./Graph";
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
  const [showGraph, setShowGraph] = useState(false);
  const [showTrackedFlightPage, setTrackedFlightVisibility] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [apiParams, setAPIParams] = useState({
    date: "",
    depart: "",
    arrive: "",
    id: "",
    uid: "",
  });

  const submitHandler = () => {
    setNewFlightVisibility(true);
    setTrackedFlightVisibility(false);
  };

  const handleClick = () => {
    setNewFlightVisibility(false);
    setShowGraph(false);
    setTrackedFlightVisibility(true);
    setRefresh(true);
  };

  const fetchTrackedFlights = () => {
    //DATABASE CODE
    helper();
    setRefresh(false);
  };

  var databaseList = [];

  const helper = async function () {
    const idDetails = {
      uid: props.data,
    };
    //console.log(props.data);
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
    var anItem;
    var aList = databaseList.map(
      (item) =>
        (anItem = {
          departureDate: item.departureDate,
          fromCity: item.fromCity,
          toCity: item.toCity,
          display:
            item.departureDate +
            ":    " +
            item.fromCity +
            "-----------> " +
            item.toCity,
          id: item.id,
          uid: item.uid,
        })
    );
    setData({ trips: aList });
  };

  const deleteTrip = () => {
    //DELETE TRIP FROM DATABASE
    //apiParams has id and uid to be deleted
    console.log(apiParams.id);
    console.log(apiParams.uid);

    setRefresh(true);
    setShowGraph(false);
    setTrackedFlightVisibility(true);
  };

  const displayGraphClick = (item) => {
    setAPIParams({
      date: item.departureDate,
      depart: item.fromCity,
      arrive: item.toCity,
      id: item.id,
      uid: item.uid,
    });
    setRefresh(true);
    setShowGraph(true);
    setTrackedFlightVisibility(false);
  };

  return (
    <div>
      {showNewFlightPage ? (
        <div>
          <NewFlight data={props.data} />
          <button onClick={handleClick}>Return to Tracked Flights</button>
        </div>
      ) : null}

      {showGraph ? (
        <div>
          <Graph> data={apiParams} </Graph>
          <button id="deleteButton" onClick={deleteTrip}>
            Delete Trip
          </button>
          <button onClick={handleClick}>Return to Tracked Flights</button>
        </div>
      ) : null}

      {showTrackedFlightPage ? (
        <form onSubmit={submitHandler}>
          <div className="form-inner">
            <div className="form-group"></div>
            <h1>Tracked Flights</h1>
            <div>
              {refresh ? fetchTrackedFlights() : null}
              {data.trips.map((item) => (
                <ListGroup.Item action onClick={() => displayGraphClick(item)}>
                  {item.display}
                </ListGroup.Item>
              ))}
            </div>
            <input type="submit" value="+ Track a New Flight" />
          </div>
        </form>
      ) : null}
    </div>
  );
}

export default TrackedFlights;
