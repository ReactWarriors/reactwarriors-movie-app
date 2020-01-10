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
      loading: false
    }
  }

  changeWatchlist = () => {
    const {session_id, getWatchlist, toggleModal, user, movieId} = this.props;

    if (user) {
      this.setState({
        loading: true
      });
      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          watchlist: !this.isWatchlist()
        }
      })
        .then(() => {
          return getWatchlist();
        })
        .then(() => {
          this.setState({
            loading: false
          })
        })
    } else {
      toggleModal();
    }
  };

  isWatchlist = () => this.props.watchlist.includes(this.props.movieId);

  render() {

    return (
      <span className={classNames({
        "icon-disabled": this.state.loading
      })}>
        {
          this.isWatchlist()
            ? <Bookmark onClick={this.changeWatchlist}/>
            : <BookmarkBorder onClick={this.changeWatchlist}/>
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
