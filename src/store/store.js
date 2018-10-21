import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const logger = ({ getState, dispatch }) => next => action => {
  return next(action);
};

const thunk = ({ getState, dispatch }) => next => action => {
  if (typeof action === "function") {
    action(dispatch, getState);
  } else {
    return next(action);
  }
};

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
