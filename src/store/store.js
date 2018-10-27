import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers/reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import * as constants from "../constants/constants";
import * as actionsMovies from "../actions/actionsMovies";
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

const updateFilterOrPaginationGetMovies = ({
  getState,
  dispatch
}) => next => action => {
  if (action.type === constants.UPDATE_FILTER) {
    dispatch(
      actionsMovies.actionCreatorGetMovies({
        filters: {
          ...getState().movies.filters,
          ...action.payload
        },
        page: 1
      })
    );
  }

  if (action.type === constants.UPDATE_PAGINATION) {
    dispatch(
      actionsMovies.actionCreatorGetMovies({
        filters: getState().movies.filters,
        page: action.payload.page
      })
    );
  }

  return next(action);
};

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(logger, thunk, updateFilterOrPaginationGetMovies)
  )
);

export default store;
