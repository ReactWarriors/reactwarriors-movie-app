import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { createStore } from "redux";

const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
  };
};

const initialState = {
  user: null,
  session_id: null,
  isAuth: false
};

const reducerApp = (state = initialState, action) => {
  console.log("reducerApp", state, action);
  switch (action.type) {
    case "UPDATE_AUTH":
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true
      };
    default:
      return state;
  }
};

const store = createStore(reducerApp);

console.log("store", store);
console.log("getState", store.getState());
store.dispatch(
  actionCreatorUpdateAuth({
    user: {
      name: "Evgeniy"
    },
    session_id: "text"
  })
);
console.log("after update Auth", store.getState());
ReactDOM.render(<App />, document.getElementById("root"));
