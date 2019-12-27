import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";


const MoviesList = ({movies, watchlist, favorites, changeFavorite, changeWatchlist}) => (
  <div className="row">
    {
      movies.length
        ? movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem
                item={movie}
                favorite={favorites.has(movie.id)}
                watchlist={watchlist.has(movie.id)}
                changeFavorite={changeFavorite}
                changeWatchlist={changeWatchlist}
              />
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

export default MoviesHOC(MoviesList);
