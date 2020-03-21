import React from "react";
import PropTypes from "prop-types";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";

const WatchlistIcon = ({ item, isWatchlist, onClickWatchlist }) => {
  return isWatchlist ? (
    <Bookmark onClick={e => onClickWatchlist(item)} />
  ) : (
    <BookmarkBorder onClick={e => onClickWatchlist(item)} />
  );
};

WatchlistIcon.propTypes = {
  item: PropTypes.object.isRequired,
  isWatchlist: PropTypes.bool.isRequired,
  onClickWatchlist: PropTypes.func.isRequired
};

export default WatchlistIcon;
