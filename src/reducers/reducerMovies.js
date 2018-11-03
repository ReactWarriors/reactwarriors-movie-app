import {
  UPDATE_MOVIES,
  UPDATE_FILTERS,
  UPDATE_PAGINATION
} from "../constants/constants";

const initialState = {
  data: [],
  filters: {
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  },
  pagination: {
    page: 1,
    total_pages: 1
  }
};

const reducerMovies = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MOVIES:
      return {
        ...state,
        data: action.payload.results,
        pagination: {
          ...state.pagination,
          page: action.payload.page,
          total_pages: action.payload.total_pages
        }
      };
    case UPDATE_FILTERS:
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
