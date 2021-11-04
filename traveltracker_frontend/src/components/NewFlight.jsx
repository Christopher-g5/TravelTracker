import React, { useState } from "react";
import { Helmet } from "react-helmet";

function NewFlight() {
  const [details, setDetails] = useState({ depart: "", arrive: "" });

  const submitHandler = async function (event) {
    event.preventDefault();
  };

  return (
    <form onSubmit={submitHandler}>
      <Helmet>
        <script defer={true}>AirportInput("autocomplete-airport-1");</script>
      </Helmet>
      <h2>Flight Information</h2>
      <div className="form_group">
        <div className="form-group">
          <label htmlFor="depart">Departing Airport: </label>
          <input
            type="text"
            name="depart"
            id="autocomplete-airport-1"
            onChange={(e) => setDetails({ ...details, depart: e.target.value })}
          />
        </div>
      </div>
    </form>
  );
}

export default NewFlight;
