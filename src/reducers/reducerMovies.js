import {
  FETCHING_MOVIES,
  UPDATE_MOVIES,
  UPDATE_FILTER,
  UPDATE_PAGINATION
} from "../constants/constants";
const initialState = {
  data: [],
  isFetching: false,
  filters: {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  },
  pagination: {
    page: 1,
    total_pages: ""
  }
};

const reducerMovies = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_MOVIES:
      return {
        ...state,
        isFetching: true
      };
    case UPDATE_MOVIES:
      return {
        ...state,
        data: action.payload.data,
        isFetching: false,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination
        }
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case UPDATE_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default reducerMovies;
