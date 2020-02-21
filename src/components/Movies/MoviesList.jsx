import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({ movies, loaded, favorite, toggleFavourite }) => {
  //console.log("movies, toggleFavourite", movies, toggleFavourite);

  return (
    <div className="row">
      {!loaded && <div className="loader"></div>}

      {movies.map(movie => {
        //console.log("toggleFavourite", toggleFavourite);
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} toggleFavourite={toggleFavourite} />
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
