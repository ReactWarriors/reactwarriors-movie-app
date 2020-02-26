import React from "react";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";

const BookmarkIcon = ({ item, watchlist, onClickWatchlist }) => {
  return watchlist.includes(item) ? (
    <Bookmark onClick={e => onClickWatchlist(item, false)} />
  ) : (
    <BookmarkBorder onClick={e => onClickWatchlist(item, true)} />
  );
};

export default BookmarkIcon;
