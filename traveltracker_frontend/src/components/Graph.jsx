import React, { useState, Component, useEffect } from "react";
import NewFlight from "./NewFlight";
import axios from "axios";
import cors from "cors";

function Graph() {
  useEffect(() => {
    const api = "https://http.cat/401";
    const data = {
      title: "Black",
      description:
        "Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir.",
      ingredients: ["Coffee"],
      id: 1,
    };
    axios
      .post(api)
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
