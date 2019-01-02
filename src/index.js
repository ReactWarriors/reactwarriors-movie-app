import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { Provider } from "mobx-react";
import { loginFormStore } from "./stores/loginFormStore";

ReactDOM.render(
  <Provider loginFormStore={loginFormStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
