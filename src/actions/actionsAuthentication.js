import * as constants from "../constants/constants";

export const actionCreatorUpdateAuth = ({ user, session_id, isAuth }) => {
  return {
    type: constants.UPDATE_AUTH,
    payload: {
      user,
      session_id,
      isAuth
    }
  };
};

export const actionCreatorLogOut = () => {
  return {
    type: constants.LOGOUT
  };
};
