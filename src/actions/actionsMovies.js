import CallApi from "../api/api";
import * as constants from "../constants/constants";

export const actionCreatorUpdateMovies = movies => ({
  type: constants.UPDATE_MOVIES,
  payload: movies
});

export const actionCreatorGetMovies = ({ filters, page }) => {
  const { sort_by, primary_release_year, with_genres } = filters;
  const queryStringParams = {
    sort_by: sort_by,
    page: page,
    primary_release_year: primary_release_year
  };

  if (with_genres.length > 0)
    queryStringParams.with_genres = with_genres.join(",");

  return dispatch => {
    dispatch({
      type: constants.FETCHING_MOVIES
    });
    CallApi.get("/discover/movie", {
      params: queryStringParams
    })
      .then(data => {
        dispatch({
          type: constants.UPDATE_MOVIES,
          payload: {
            data: data.results,
            pagination: {
              page: data.page,
              total_pages: data.total_pages
            }
          }
        });
      })
      .catch(error => {
        dispatch({
          type: constants.ERROR_GET_MOVIES,
          payload: error
        });
      });
  };
};

export const actionCreatorUpdateFilter = filter => {
  return {
    type: constants.UPDATE_FILTER,
    payload: filter
  };
};

export const actionCreatorUpdatePagination = pagination => {
  return {
    type: constants.UPDATE_PAGINATION,
    payload: pagination
  };
};
