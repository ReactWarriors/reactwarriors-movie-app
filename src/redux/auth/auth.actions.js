import * as types from "./auth.types";
import CallApi from "../../api/api";

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: types.FETCH_REQUEST_AUTH
  });
  CallApi.get("/account", {
    params: {
      session_id
    }
  })
    .then(user => {
      dispatch(updateAuth({ user, session_id }));
      dispatch(fetchFavoriteMovies({ user, session_id }));
    })
    .catch(error => {
      dispatch({
        type: types.FETCH_ERROR_AUTH,
        payload: error
      });
    });
};

export const updateAuth = ({ user, session_id }) => ({
  type: "FETCH_SUCCESS_AUTH",
  payload: {
    user,
    session_id
  }
});

export const fetchFavoriteMovies = ({ user, session_id }) => dispatch => {
  CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    dispatch(updateFavoriteMovies(data.results));
  });
};

export const updateFavoriteMovies = movies => {
  return {
    type: "UPDATE_FAVORITE_MOVIES",
    payload: movies
  };
};

export const onLogOut = () => {
  return {
    type: "LOGOUT"
  };
};

export const toggleLoginModal = () => {
  return {
    type: "TOGGLE_LOGIN_MODAL"
  };
};
