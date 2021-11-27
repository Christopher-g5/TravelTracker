import React, { useState, Component, useEffect } from "react";
import NewFlight from "./NewFlight";
import moment from "moment";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Graph(props) {
  useEffect(() => {
    const api =
      "https://zg8kwg7iul.execute-api.us-west-1.amazonaws.com/staging";
    const data = {
      originIataCode: props.children[1].depart,
      destinationIataCode: props.children[1].arrive,
      departureDate: moment(props.children[1].date).format("yyyy-MM-DD"),
    };

    const sent = "avg1MonthAgo";

    // const data = {
    //   originIataCode: "SFO",
    //   destinationIataCode: "JFK",
    //   departureDate: "2021-12-21",
    // };
    axios
      .post(api, data)
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // const months

  const data = [];
  const requestedDate = moment(props.children[1].date);

  const testSomeThing = () => {
    //console.log(data);
  };

  const fillData = () => {
    data.push({
      Month: requestedDate.subtract(0, "months").format("MMMM"),
      Recent_Price: 10,
      Price_Last_Year: 5,
    });
    for (let i = 0; i < 11; i++) {
      data.push({
        Month: requestedDate.subtract(1, "months").format("MMMM"),
        Recent_Price: i + 10,
        Price_Last_Year: i + 5,
      });
    }
  };

  return (
    <div className="graphContainer">
      <h1>Graph</h1>
      {fillData()}
      {testSomeThing()}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="green" stopOpacity={0.4}></stop>
              <stop offset="75%" stopColor="green" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>
          <defs>
            <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="brown" stopOpacity={0.4}></stop>
              <stop offset="75%" stopColor="brown" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>
          <Area dataKey="Recent_Price" stroke="green" fill="url(#color)" />
          <Area dataKey="Price_Last_Year" stroke="brown" fill="url(#color2)" />
          <XAxis dataKey="Month" />
          <YAxis
            dataKey="Recent_Price"
            tickCount={8}
            tickFormatter={(number) => `$${number.toFixed(2)}}`}
          />
          <Tooltip />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
