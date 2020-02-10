import CallApi from "../../api/api";
import * as types from "./auth.types";

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
      dispatch(updateAuth({user, session_id}));
      dispatch(fetchFavorites({user, session_id}));
      dispatch(fetchWatchlist({user, session_id}));
    })
    .catch(error => {
      dispatch({
        type: types.FETCH_ERROR_AUTH,
        payload: error
      })
    })
};

const updateAuth = ({user, session_id}) => ({
  type: types.FETCH_SUCCESS_AUTH,
  payload: {
    user,
    session_id
  }
});

export const fetchFavorites = ({user, session_id}) => dispatch => {
  CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id
    }
  })
    .then(data => {
      dispatch(updateFavorites(data.results));
    })
};

export const updateFavorites = movies => {
  return {
    type: types.UPDATE_FAVORITES,
    payload: movies
  }
};

export const fetchWatchlist = ({user, session_id}) => dispatch => {
  CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: {
      session_id
    }
  })
    .then(data => {
      dispatch(updateWatchlist(data.results));
    })
};

export const updateWatchlist = movies => {
  return {
    type: types.UPDATE_WATCHLIST,
    payload: movies
  }
};

export const onLogOut = () => {
  return {
    type: types.LOGOUT
  }
};

export const toggleModal = () => {
  return {
    type: types.TOGGLE_MODAL_LOGIN,
  }
};


