import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { Provider } from "mobx-react";
import { loginFormStore } from "./stores/loginFormStore";
import { userStore } from "./stores/userStore";
import { moviesPageStore } from "./stores/moviesPageStore";

ReactDOM.render(
  <Provider
    loginFormStore={loginFormStore}
    userStore={userStore}
    moviesPageStore={moviesPageStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);
