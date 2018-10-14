import reducerAuthentification from "./reducerAuthentification";
import reducerMovies from "./reducerMovies";
import { combineReducers } from "redux";

const reducers = combineReducers({
  authentification: reducerAuthentification,
  movies: reducerMovies
});

export default reducers;
