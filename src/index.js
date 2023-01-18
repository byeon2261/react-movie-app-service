import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import App1 from "./App_1_toDoList";
import App2 from "./App_2_CoinTracker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App2 />
  // </React.StrictMode>
);
