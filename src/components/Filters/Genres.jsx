import React from "react";
import PropTypes from "prop-types";

const Genres = ({ genres, with_genres, onChangeGenre }) => (
  <div className="form-group">
    <label htmlFor="genre">Жанр:</label>
    {genres.map(genre => {
      return (
        <div className="form-check form-check" key={genre.id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={genre.id}
            name="genre"
            checked={with_genres.includes(String(genre.id))}
            value={genre.name}
            onChange={onChangeGenre}
          ></input>
          <label className="form-check-label" htmlFor="inlineCheckboxGenre">
            {genre.name}
          </label>
        </div>
      );
    })}
  </div>
);

Genres.defaultProps = {
  genres: [],
  with_genres: false,
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
};

export default Genres;
