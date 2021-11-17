import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Graph from "./Graph";
import { API, graphqlOperation } from "aws-amplify";
import { createTrip } from "../graphql/mutations";
import Amplify from "aws-amplify";

const addTrip = `mutation createTrip($uid:String! $departureDate: String! $fromCity: String! $toCity: String!) {
  createTrip(input:{
    uid:$uid
    departureDate:$departureDate
	fromCity: $fromCity
	toCity: $toCity
  }){
    id
	uid
	departureDate
	fromCity
	toCity
  }
}`;

function NewFlight(props) {
  //const [details, setDetails] = useState({ depart: "", arrive: "" });
  const [dates, setDates] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [apiParams, setAPIParams] = useState({
    date: "",
    depart: "",
    arrive: "",
  });

  var refDepart = React.createRef();
  var parsedDepart = null;
  var refArrive = React.createRef();
  var parsedArrive = null;

  const submitHandler = async function (event) {
    event.preventDefault();

    parsedDepart = parseIATA(refDepart.current.value);
    parsedArrive = parseIATA(refArrive.current.value);

    setAPIParams({ date: dates, depart: parsedDepart, arrive: parsedArrive });
    if (parsedDepart.length > 2 && parsedArrive.length > 2) {
      setShowGraph(true);
    }

    //DATABASE AND API CODE HERE
    //Add a new trip here with mutation to database.
    const tripDetails = {
      uid: props.data,
      departureDate: dates,
      fromCity: parsedDepart,
      toCity: parsedArrive,
    };
    try {
      const newTodo = await API.graphql(graphqlOperation(addTrip, tripDetails));
      alert(JSON.stringify(newTodo));
    } catch (e) {
      console.log("Fetching error: ", e);
    }

    //API.graphql(graphqlOperation(mutations.createItem, {input: itemDetails}));
  };

  const parseIATA = (airport) => {
    return airport.split(" ", 1)[0];
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Helmet async={true}>
          <script defer={true}>
            AirportInput("autocomplete-airport-1");
            AirportInput("autocomplete-airport-2");
          </script>
        </Helmet>
        <div className="form-inner">
          <h2>Flight Information</h2>
          <div className="form-group">
            <label htmlFor="depart">Departing Airport IATA Code: </label>
            <input
              type="text"
              name="depart"
              id="autocomplete-airport-1"
              className="inp"
              ref={refDepart}
            />
            <label htmlFor="date">Departure Date: </label>
            <DatePicker
              selected={dates}
              onChange={(date) => setDates(date)}
              dateFormat={"yyyy-MM-dd"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="arrive">Destination Airport IATA Code: </label>
            <input
              type="text"
              name="depart"
              id="autocomplete-airport-2"
              ref={refArrive}
            />
          </div>
          <input type="submit" value="Submit" />
        </div>
      </form>
      {showGraph ? <Graph>data = {apiParams} </Graph> : null}
    </div>
  );
}

export default NewFlight;
