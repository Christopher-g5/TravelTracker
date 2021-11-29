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
  Legend,
} from "recharts";
import ScaleLoader from "react-spinners/ScaleLoader";

function Graph(props) {
  const [state, setState] = useState({});

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
        console.log(response.data);
        //console.log(response.data.currentPriceHistory[0])
        var responseArrayCurrent = response.data;
        //count keys returned from api in data
        var count = 0;
        for (var key in responseArrayCurrent) {
          if (responseArrayCurrent.hasOwnProperty(key)) count++;
        }
        //console.log(count);
        if (count != 2) {
          setError(true);
        } else {
          setData(response.data);
          setFillData(true);
        }
        return () => {
          setState({}); // This worked for me
        };
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  const [data, setData] = useState([]);
  const [fillData, setFillData] = useState(false);
  const [error, setError] = useState(false);
  const requestedDate = moment(props.children[1].date);
  const [renderGraph, setRenderGraph] = useState(false);
  const [graphDomain, setGraphDomain] = useState({ min: 5000, max: 0 });
  const [vdata, setVData] = useState([]);
  const title =
    moment(props.children[1].date).format("yyyy-MM-DD") +
    ":   " +
    props.children[1].depart +
    "----------->" +
    props.children[1].arrive;
  const errorMsg = "No information for the requested trip. Please try again.";

  //For Graph Data
  const fillDataGraph = () => {
    var tempData = [];
    var allData = data.currentPriceHistory.concat(data.previousPriceHistory);

    var parsedData = removeItemAll(allData, -1);

    var min = Math.min(...parsedData);
    var max = Math.max(...parsedData);

    requestedDate.subtract(10, "months").format("MMMM");
    for (let i = 9; i >= 0; i--) {
      var recent = 0;
      var past = 0;
      if (data.currentPriceHistory[i] == -1) {
        recent = null;
      } else {
        recent = data.currentPriceHistory[i];
      }

      if (data.previousPriceHistory[i] == -1) {
        past = null;
      } else {
        past = data.previousPriceHistory[i];
      }

      tempData.push({
        Month: requestedDate.add(1, "months").format("MMMM"),
        Recent_Price: recent,
        Price_Last_Year: past,
      });
    }
    console.log(min);
    console.log(max);
    setVData(tempData);
    setGraphDomain({ min: min, max: max });
    setFillData(false);
    setRenderGraph(true);
  };

  function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }

  return (
    <div className="graphContainer">
      <h1>{title}</h1>
      {error ? <h1>{errorMsg}</h1> : null}
      {!error && !renderGraph ? (
        <ScaleLoader
          color={"#FF9600"}
          height={200}
          width={12}
          radius={10}
          margin={7}
        />
      ) : null}
      {fillData ? fillDataGraph() : null}
      {renderGraph ? (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={vdata} color={"red"}>
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
              </linearGradient>
            </defs>
            <Area dataKey="Recent_Price" stroke="green" fill="url(#color)" />
            <XAxis dataKey="Month" />
            <YAxis
              dataKey="Recent_Price"
              domain={[graphDomain.min, graphDomain.max]}
              tickCount={8}
              tickFormatter={(number) => `$${number.toFixed(2)}`}
            />
            <Tooltip />
            <CartesianGrid opacity={0.5} />
            <Legend iconSize={20} />
          </AreaChart>
        </ResponsiveContainer>
      ) : null}
    </div>
  );
}

export default Graph;
