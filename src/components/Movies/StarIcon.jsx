import React from "react";
import { Star, StarBorder } from "@material-ui/icons";

const StarIcon = ({ item, favorite, onClickFavorite }) => {
  //const { id } = item;

  return favorite.includes(item) ? (
    <Star onClick={e => onClickFavorite(item, false)} />
  ) : (
    <StarBorder onClick={e => onClickFavorite(item, true)} />
  );
};

export default StarIcon;
