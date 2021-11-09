import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Fuse from "fuse.js";

function NewFlight() {
  const [details, setDetails] = useState({ depart: "", arrive: "" });
  // const [dates, setDates] = useState(null);
  const [dates, setDates] = useState({ depart: null, arrive: null });

  const submitHandler = async function (event) {
    event.preventDefault();
    console.log(dates.depart);
    console.log(dates.arrive);
  };

  return (
    <form onSubmit={submitHandler}>
      <Helmet>
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
            onChange={(e) => setDetails({ ...details, depart: e.target.value })}
          />
          <DatePicker
            selected={dates.depart}
            onChange={(date) => setDates({ ...dates, depart: date })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="arrive">Destination Airport IATA Code: </label>
          <input
            type="text"
            name="depart"
            id="autocomplete-airport-2"
            onChange={(e) => setDetails({ ...details, arrive: e.target.value })}
          />
          <DatePicker
            selected={dates.arrive}
            onChange={(date) => setDates({ ...dates, arrive: date })}
          />
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewFlight;
