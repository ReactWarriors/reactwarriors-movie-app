import React from "react";
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

export default StarIcon;
