import reducerAuthentication from "./reducerAuthentication";
import reducerMovies from "./reducerMovies";
import { combineReducers } from "redux";

const reducers = combineReducers({
  authentication: reducerAuthentication,
  movies: reducerMovies
});

export default reducers;
