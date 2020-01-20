import React from "react";
import GenreItem from "./GenreItem";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";


const Genres = ({genres, with_genres, onChangeGenres}) => (
  <div className="form-group mb-1">
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

Genres.defaultProps = {
  genres: [],
  with_genres: []
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func
};

export default GenresHOC(Genres);
