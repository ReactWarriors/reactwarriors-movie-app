import React from "react";
import PropTypes from "prop-types";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";

const BookmarkIcon = ({ item, watchlist, onClickWatchlist }) => {
  return watchlist.find(movie => {
    return movie.id === item.id;
  }) ? (
    <Bookmark onClick={e => onClickWatchlist(item, false)} />
  ) : (
    <BookmarkBorder onClick={e => onClickWatchlist(item, true)} />
  );
};

BookmarkIcon.propTypes = {
  item: PropTypes.object.isRequired,
  watchlist: PropTypes.array.isRequired,
  onClickWatchlist: PropTypes.func.isRequired,
};

export default BookmarkIcon;
