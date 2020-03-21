import React from "react";
import PropTypes from "prop-types";
import { Star, StarBorder } from "@material-ui/icons";

const FavoriteIcon = ({ item, isFavorite, onClickFavorite }) => {
  return isFavorite ? (
    <Star onClick={e => onClickFavorite(item, false)} />
  ) : (
    <StarBorder onClick={e => onClickFavorite(item, true)} />
  );
};

FavoriteIcon.propTypes = {
  item: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default FavoriteIcon;
