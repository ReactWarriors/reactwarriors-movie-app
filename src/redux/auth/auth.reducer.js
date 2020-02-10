import * as types from "./auth.types";
import {cookies} from "../../utils/cookies";


const initialState = {
  user: null,
  session_id: cookies.get("session_id"),
  showLoginModal: false,
  favorites: [],
  watchlist: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.FETCH_SUCCESS_AUTH:
      return {
        ...state,
        user: action.payload.user,
        session_id: action.payload.session_id,
      };

    case types.LOGOUT:
      return {
        ...state,
        session_id: null,
        user: null,
        favorites: [],
        watchlist: [],
        showLoginModal: false,
      };

    case types.TOGGLE_MODAL_LOGIN:
      return {
        ...state,
        showLoginModal: !state.showLoginModal
      };

    case types.UPDATE_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };

    case types.UPDATE_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload
      };

    default:
      return state
  }
};

export default authReducer;
