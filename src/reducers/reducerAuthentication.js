import * as constants from "../constants/constants";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  isAuth: false
};

const reducerAuthentication = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE_AUTH:
      cookies.set("session_id", action.payload.session_id, {
        path: "/",
        maxAge: 2592000
      });
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
        isAuth: true
      };
    case constants.LOGOUT:
      cookies.remove("session_id");
      return {
        ...state,
        session_id: null,
        user: null,
        isAuth: false
      };
    default:
      return state;
  }
};

export default reducerAuthentication;
