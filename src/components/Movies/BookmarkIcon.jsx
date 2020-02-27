import React from "react";
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

export default BookmarkIcon;
