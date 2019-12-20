import React from "react";
import GenreItem from "./GenreItem";
import PropTypes from "prop-types";
import MoviesList from "../../Movies/MoviesList";


const Genres = ({genres, with_genres, onChangeGenres}) => (
  <div className="form-group mb-1">
    <div className="mb-2">Жанры:</div>
    <div className="form-check">
        {genres.map(genre => {
          return (
            <div key={genre.id}>
              <GenreItem
                item={genre}
                checked={with_genres.includes(genre.id.toString())}
                onChange={onChangeGenres}
              />
            </div>
          )
        })}
    </div>
  </div>
);

MoviesList.defaultProps = {
  genres: [],
  with_genres: []
};

MoviesList.propTypes = {
  genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func
};

export default Genres;
