import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";

const logger = ({ getState, dispatch }) => next => action => {
  // console.log("dispatch", dispatch);
  // console.log(action.type, action);
  return next(action);
};

const async = ({ getState, dispatch }) => next => action => {
  console.log("async", action);
  if (typeof action === "function") {
    action(dispatch, "yo i understand");
  } else {
    return next(action);
  }
};

const store = createStore(reducers, applyMiddleware(async));

export default store;
