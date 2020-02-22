import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({
  movies,
  loaded,
  favorite,
  watchlist,
  toggleFavorite,
  toggleWatchlist
}) => {
  
  favorite = favorite || [];
  watchlist = watchlist || [];

  return (
    <div className="row">
      {!loaded && <div className="loader"></div>}

      {movies.map(movie => {
        // console.log("favorite", favorite);
        
        //console.log("favorite, watchlist", favorite, watchlist);

        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem
              item={movie}
              toggleFavorite={toggleFavorite}
              toggleWatchlist={toggleWatchlist}
              isFavorite={favorite.includes(movie.id)}
              isWatchlist={watchlist.includes(movie.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(MoviesList);
