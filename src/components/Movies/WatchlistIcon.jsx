import React from "react";
import PropTypes from "prop-types";
import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import CallApi from "../../api/api";
import { AppContext } from "../App";

const WatchlistIcon = ({ item }) => {
  return (
    <AppContext.Consumer>
      {context => {
        // console.log("context", context);

        const isWatchlist = Boolean(
          context.watchlist.find(movie => {
            return movie.id === item.id;
          })
        );

        return isWatchlist ? (
          <Bookmark onClick={e => onClickWatchlist(item, false, context)} />
        ) : (
          <BookmarkBorder onClick={e => onClickWatchlist(item, true, context)} />
        );
      }}
    </AppContext.Consumer>
  );
};

const onClickWatchlist = (item, newValue, context) => {
  const { user, session_id, uploadWatchlist, toggleShowLogin } = context;

  if (!session_id) {
    toggleShowLogin();
    return;
  }

  CallApi.post(`/account/${user.id}/watchlist`, {
    params: {
      session_id: session_id,
      media_type: "movie",
      media_id: item.id,
      watchlist: newValue
    }
  }).then(
    response => {
      uploadWatchlist(user, session_id);
    },
    reject => {}
  );
};

WatchlistIcon.propTypes = {
  item: PropTypes.object.isRequired,
  // isWatchlist: PropTypes.bool.isRequired,
  // onClickWatchlist: PropTypes.func.isRequired
};

export default WatchlistIcon;
