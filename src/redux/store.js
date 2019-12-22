import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const logger = store => next => action => {
  console.log("store", store.getState());
  console.log("type", action.type);
  console.log("payload", action.payload);
  return next(action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export default store;
