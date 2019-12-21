export const actionCreatorUpdateAuth = ({ user, session_id }) => {
  return {
    type: "UPDATE_AUTH",
    payload: {
      user,
      session_id
    }
  };
};

export const actionCreatorLogOut = () => {
  return {
    type: "LOGOUT"
  };
};
