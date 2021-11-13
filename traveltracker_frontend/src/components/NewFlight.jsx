import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Graph from "./Graph";

function NewFlight(uid) {
  //const [details, setDetails] = useState({ depart: "", arrive: "" });
  const [dates, setDates] = useState(null);

  var refDepart = React.createRef();
  var parsedDepart = null;
  var refArrive = React.createRef();
  var parsedArrive = null;

  const submitHandler = async function (event) {
    event.preventDefault();

    parsedDepart = parseIATA(refDepart.current.value);
    parsedArrive = parseIATA(refArrive.current.value);
    console.log(parsedArrive);
    console.log(parsedDepart);
    // console.log(dates.depart);
    // console.log(refArrive.current.value);
    // console.log(dates.arrive);

    //DATABASE AND API CODE HERE
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
        <h2>Flight Information</h2>
        <div className="form_group">
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
            <DatePicker selected={dates} onChange={(date) => setDates(date)} />
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
        </div>
        <input type="submit" value="Submit" />
      </form>
      <Graph></Graph>
    </div>
  );
}

export default NewFlight;
