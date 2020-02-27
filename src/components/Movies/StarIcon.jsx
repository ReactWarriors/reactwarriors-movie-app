import React from "react";
import PropTypes from "prop-types";
import { Star, StarBorder } from "@material-ui/icons";

const StarIcon = ({ item, favorite, onClickFavorite }) => {
  return favorite.find(movie => {
    return movie.id === item.id;
  }) ? (
    <Star onClick={e => onClickFavorite(item, false)} />
  ) : (
    <StarBorder onClick={e => onClickFavorite(item, true)} />
  );
};

StarIcon.propTypes = {
  item: PropTypes.object.isRequired,
  favorite: PropTypes.array.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default StarIcon;
