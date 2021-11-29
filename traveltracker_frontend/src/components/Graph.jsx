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

    axios
      .post(api, data)
      .then((response) => {
        console.log(response);
        //console.log(response.data.currentPriceHistory[0]);
        var responseArrayCurrent = response.data;
        if (responseArrayCurrent.length != 2) {
          setError(true);
        } else {
          setData(response.data);
          setFillData(true);
          setRenderGraph(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [data, setData] = useState([]);
  const [fillData, setFillData] = useState(false);
  const [error, setError] = useState(false);
  const requestedDate = moment(props.children[1].date);
  const [renderGraph, setRenderGraph] = useState(false);
  var vdata = [];
  var max = 0;
  var min = 5000;
  const title =
    moment(props.children[1].date).format("yyyy-MM-DD") +
    ":   " +
    props.children[1].depart +
    "----------->" +
    props.children[1].arrive;
  const errorMsg = "No information for the requested trip. Please try again.";

  //For Graph Data
  const fillDataGraph = () => {
    requestedDate.subtract(10, "months").format("MMMM");
    for (let i = 9; i >= 0; i--) {
      var recent = 0;
      var past = 0;
      if (data.currentPriceHistory[i] == -1) {
        recent = null;
      } else {
        recent = data.currentPriceHistory[i];
        if (recent > max) {
          max = recent;
        }
        if (recent < min) {
          min = recent;
        }
      }

      if (data.previousPriceHistory[i] == -1) {
        past = null;
      } else {
        past = data.previousPriceHistory[i];
        if (past > max) {
          max = past;
        }
        if (past < min) {
          min = past;
        }
      }

      vdata.push({
        Month: requestedDate.add(1, "months").format("MMMM"),
        Recent_Price: recent,
        Price_Last_Year: past,
      });
    }
  };

  return (
    <div className="graphContainer">
      <h1>{title}</h1>
      {error ? <h1>{errorMsg}</h1> : null}
      {!error && !renderGraph ? <h1>Loading...</h1> : null}
      {fillData ? fillDataGraph() : null}
      {renderGraph ? (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={vdata}>
            <defs>
              <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="brown" stopOpacity={0.4}></stop>
                <stop offset="75%" stopColor="brown" stopOpacity={0.05}></stop>
              </linearGradient>
            </defs>
            <Area
              dataKey="Price_Last_Year"
              stroke="brown"
              fill="url(#color2)"
            />
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="green" stopOpacity={0.4}></stop>
                <stop offset="75%" stopColor="green" stopOpacity={0.05}></stop>
              </linearGradient>
            </defs>
            <Area dataKey="Recent_Price" stroke="green" fill="url(#color)" />
            <XAxis dataKey="Month" />
            <YAxis
              dataKey="Recent_Price"
              domain={[min - 5, max]}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(2)}}`}
            />
            <Tooltip />
            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

export default Graph;
