import CallApi from "../api/api";
import * as constants from "../constants/constants";

export const actionCreatorUpdateAuth = payload => {
  return {
    type: constants.UPDATE_AUTH,
    payload
  };
};

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT"
  };
};

export const actionCreatorUpdateMovies = movies => ({
  type: constants.UPDATE_MOVIES,
  payload: movies
});

export const actionCreatorUpdateFilters = event => {
  return {
    type: constants.UPDATE_FILTERS,
    payload: {
      [event.target.name]: event.target.value
    }
  };
};

export const actionCreatorUpdatePagination = ({ page, total_pages }) => {
  return {
    type: constants.UPDATE_PAGINATION,
    payload: {
      page,
      total_pages
    }
  };
};

export const actionCreatorGetMovies = (filters, page) => {
  const { sort_by, primary_release_year, with_genres } = filters;
  const queryStringParams = {
    language: "ru-RU",
    sort_by: sort_by,
    page: page,
    primary_release_year: primary_release_year
  };

  if (with_genres.length > 0)
    queryStringParams.with_genres = with_genres.join(",");

  return dispatch => {
    dispatch({
      type: "FETCHING_MOVIES"
    });
    CallApi.get("/discover/movie", {
      params: queryStringParams
    })
      .then(response => {
        dispatch({
          type: "UPDATE_MOVIES",
          payload: response
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR_GET_MOVIES",
          payload: error
        });
      });
  };
};
