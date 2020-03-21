import React from "react";
import PropTypes from "prop-types";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";

const WatchlistIcon = ({ item, isWatchlist, onClickWatchlist }) => {
  return isWatchlist ? (
    <Bookmark onClick={e => onClickWatchlist(item)} />
  ) : (
    <BookmarkBorder onClick={e => onClickWatchlist(item)} />
  );
  // return watchlist.find(movie => {
  //   return movie.id === item.id;
  // }) ? (
  //   <Bookmark onClick={e => onClickWatchlist(item, false)} />
  // ) : (
  //   <BookmarkBorder onClick={e => onClickWatchlist(item, true)} />
  // );
};

WatchlistIcon.propTypes = {
  item: PropTypes.object.isRequired,
  isWatchlist: PropTypes.bool.isRequired,
  onClickWatchlist: PropTypes.func.isRequired
};

export default WatchlistIcon;
