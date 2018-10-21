import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";

const logger = ({ getState, dispatch }) => next => action => {
  return next(action);
};

const thunk = ({ getState, dispatch }) => next => action => {
  if (typeof action === "function") {
    action(dispatch);
  } else {
    return next(action);
  }
};

const store = createStore(reducers, applyMiddleware(logger, thunk));

export default store;
