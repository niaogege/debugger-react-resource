import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PlayerProvider } from "@xmly/x-player";
console.log(React, "react");
console.log(ReactDOM, "ReactDOM");
ReactDOM.render(
  <React.StrictMode>
    {/* <PlayerProvider defaultPlugin> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </PlayerProvider> */}
  </React.StrictMode>,
  document.getElementById("root"),
  () => {
    console.log("REnder After APP");
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
