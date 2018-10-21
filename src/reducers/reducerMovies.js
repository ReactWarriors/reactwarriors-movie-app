import { UPDATE_MOVIES } from "../constants/constants";
const initialState = {
  data: []
};

const reducerMovies = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MOVIES:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default reducerMovies;
