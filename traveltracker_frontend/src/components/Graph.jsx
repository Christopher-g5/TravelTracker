import React, { useState, Component, useEffect } from "react";
import NewFlight from "./NewFlight";
import moment from "moment";
import axios from "axios";

function Graph(props) {
  useEffect(() => {
    const api =
      "https://zg8kwg7iul.execute-api.us-west-1.amazonaws.com/staging";
    const data = {
      originIataCode: props.children[1].depart,
      destinationIataCode: props.children[1].arrive,
      departureDate: moment(props.children[1].date).format("yyyy-MM-DD"),
    };

    // const data = {
    //   originIataCode: "SFO",
    //   destinationIataCode: "JFK",
    //   departureDate: "2021-12-21",
    // };
    axios
      .post(api, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const testSomeThing = () => {
    console.log(moment(props.children[1].date).format("yyyy-MM-DD"));
    console.log(props.children[1].depart);
    console.log(props.children[1].arrive);
  };

  return (
    <div>
      <h1>Graph</h1>
      {testSomeThing()}
    </div>
  );
}

export default Graph;
