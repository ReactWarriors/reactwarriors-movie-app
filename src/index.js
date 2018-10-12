import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import store from "./store/store";

ReactDOM.render(<App store={store} />, document.getElementById("root"));
