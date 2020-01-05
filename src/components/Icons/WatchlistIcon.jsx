import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import {Bookmark, BookmarkBorder} from "@material-ui/icons";
import CallApi from "../../api/api";
import PropTypes from "prop-types";
import classNames from "classnames";

class WatchlistIcon extends React.Component {
  constructor() {
    super();

    this.state = {
      submittingWatchlist: false
    }
  }

  changeWatchlist = (movieId, isWatchlist) => {
    const {session_id, getWatchlist, toggleModal, user} = this.props;

    if (user) {
      this.setState({
        submittingWatchlist: true
      });
      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          watchlist: isWatchlist
        }
      })
        .then(() => {
          return getWatchlist();
        })
        .then(() => {
          this.setState({
            submittingWatchlist: false
          })
        })
    } else {
      toggleModal();
    }
  };

  render() {
    const {movieId} = this.props;
    const watchlist = this.props.watchlist.includes(movieId);
    const disabled = this.state.submittingWatchlist;
    const onClick = () => this.changeWatchlist(movieId, !watchlist);

    return (
      <span className={classNames({"icon-disabled": disabled})}>
        {
          watchlist
            ? <Bookmark onClick={onClick}/>
            : <BookmarkBorder onClick={onClick}/>
        }
      </span>
    )
  }
}

WatchlistIcon.propTypes = {
  getWatchlist: PropTypes.func,
  session_id: PropTypes.string,
  toggleModal: PropTypes.func,
  user: PropTypes.object,
  movieId: PropTypes.number,
};

export default AppContextHOC(WatchlistIcon);
