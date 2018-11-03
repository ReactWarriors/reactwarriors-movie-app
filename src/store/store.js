import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import * as constants from "../constants/constants";
import { actionCreatorGetMovies } from "../actions/actions";

const thunk = ({ getState, dispatch }) => next => action => {
  if (typeof action === "function") {
    action(dispatch, getState);
  } else {
    return next(action);
  }
};

const changingFiltersOrPagination = ({
  getState,
  dispatch
}) => next => action => {
  if (action.type === constants.UPDATE_FILTERS) {
    const filters = {
      ...getState().movies.filters,
      ...action.payload
    };
    dispatch(actionCreatorGetMovies(filters, 1));
  }

  if (action.type === constants.UPDATE_PAGINATION) {
    dispatch(
      actionCreatorGetMovies(getState().movies.filters, action.payload.page)
    );
  }
  return next(action);
};

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, changingFiltersOrPagination))
);

export default store;
