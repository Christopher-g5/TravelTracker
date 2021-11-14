import React, { useState, Component, useEffect } from "react";
import NewFlight from "./NewFlight";
import axios from "axios";

function Graph() {
  useEffect(() => {
    const api =
      "https://zg8kwg7iul.execute-api.us-west-1.amazonaws.com/staging";
    const data = {
      originIataCode: "SFO",
      destinationIataCode: "JFK",
      departureDate: "2021-12-21",
    };
    axios
      .get(api)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Graph</h1>
    </div>
  );
}

export default Graph;
