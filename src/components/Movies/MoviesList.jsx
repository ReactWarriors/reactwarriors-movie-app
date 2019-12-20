import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";


const MoviesList = ({movies}) => (
  <div className="row">
    {
      movies.length
      ? movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie}/>
            </div>
          );
        })
      : <div className="mx-auto mt-4" key="notFounded">Ничего не найдено</div>
    }
  </div>
);

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesList;
