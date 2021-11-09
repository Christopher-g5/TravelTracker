import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewFlight() {
  //const [details, setDetails] = useState({ depart: "", arrive: "" });
  const [dates, setDates] = useState({ depart: null, arrive: null });

  var refDepart = React.createRef();
  var parsedDepart = null;
  var refArrive = React.createRef();
  var parsedArrive = null;

  const submitHandler = async function (event) {
    event.preventDefault();
    console.log(refDepart.current.value);
    console.log(dates.depart);
    console.log(refArrive.current.value);
    console.log(dates.arrive);
  };

  return (
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
            ref={refArrive}
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
