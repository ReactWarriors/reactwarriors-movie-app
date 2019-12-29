import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import {Bookmark, BookmarkBorder} from "@material-ui/icons";

class WatchlistIcon extends React.Component {
  render() {
    const {id} = this.props;
    const watchlist = this.props.watchlist.has(id);
    let disabled = this.props.submittingWatchlist;
    let onClick = !disabled ? (() => this.props.changeWatchlist(id, !watchlist)) : undefined;

    return (
      <span>
        {
          watchlist
            ? <Bookmark onClick={onClick}/>
            : <BookmarkBorder onClick={onClick}/>
        }
      </span>
    )
  }
}

export default AppContextHOC(WatchlistIcon);
