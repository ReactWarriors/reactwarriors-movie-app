import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies, loaded }) => {
  // favorite = favorite || [];
  // watchlist = watchlist || [];

  return (
    <div className="row">
      {!loaded && <div className="loader"></div>}

      {movies.map(item => {
        return (
          <div key={item.id} className="col-6 mb-4">
            <MovieItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: [],
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MoviesHOC(MoviesList);
