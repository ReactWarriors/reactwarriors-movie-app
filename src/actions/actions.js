import CallApi from "../api/api";

export const actionCreatorUpdateAuth = payload => {
  return {
    type: "UPDATE_AUTH",
    payload
  };
};

// export const actionCreatorUpdateAuth = payload => dispatch => {
//   console.log(dispatch);
//   return dispatch({
//     type: "UPDATE_AUTH",
//     payload
//   });
// };

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT"
  };
};

export const actionCreatorUpdateMovies = movies => ({
  type: "UPDATE_MOVIES",
  payload: movies
});

export const actionCreatorGetMovies = params => {
  return (dispatch, text) => {
    console.log("dispatch", dispatch, text);
    dispatch({
      type: "FETCHING_MOVIES"
    });
    CallApi.get("/discover/movie", {
      params: params
    })
      .then(data => {
        dispatch({
          type: "UPDATE_MOVIES",
          payload: data.results
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
