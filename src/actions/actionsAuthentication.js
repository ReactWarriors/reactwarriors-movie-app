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
