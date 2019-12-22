import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

// const thunk = ({ dispatch, getState }) => next => action => {
//   if (typeof action === "function") {
//     return action(dispatch, getState);
//   }
//   return next(action);
// };

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
