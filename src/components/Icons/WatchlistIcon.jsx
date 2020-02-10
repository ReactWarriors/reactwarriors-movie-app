import React from "react";
import {withAuth} from "../../hoc/withAuth";
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
    const {user, session_id} = this.props.auth;
    const {authActions, movieId} = this.props;

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
          return authActions.fetchWatchlist({user, session_id});
        })
        .then(() => {
          this.setState({
            loading: false
          })
        })
    } else {
      authActions.toggleModal();
    }
  };

  isWatchlist = () => this.props.auth.watchlist.some(item => item.id === this.props.movieId);

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
  updateWatchlist: PropTypes.func,
  session_id: PropTypes.string,
  toggleModal: PropTypes.func,
  user: PropTypes.object,
  movieId: PropTypes.number,
};

export default withAuth(WatchlistIcon);
