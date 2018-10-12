import { createStore } from "redux";
import reducerApp from "../reducers/reducers";

const store = createStore(reducerApp);

export default store;
