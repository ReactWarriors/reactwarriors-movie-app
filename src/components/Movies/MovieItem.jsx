import React from "react";
import PropTypes from "prop-types";
import FavoriteIcon from "./FavoriteIcon";
import WatchlistIcon from "./WatchlistIcon";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";

class MovieItem extends React.Component {
  onClickFavorite = (item, newValue) => {
    const { user, session_id, toggleFavorite, toggleShowLogin } = this.props;

    if (!session_id) {
      toggleShowLogin();
      return;
    }

    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id,
        media_type: "movie",
        media_id: item.id,
        favorite: newValue
      }
    }).then(
      response => {
        toggleFavorite(item);
      },
      reject => {}
    );
  };

  onClickWatchlist = (item, newValue) => {
    const { user, session_id, toggleWatchlist, toggleShowLogin } = this.props;

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
        toggleWatchlist(item);
      },
      reject => {}
    );
  };

  render() {
    const { item, favorite, watchlist } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;

    
    // const isFavorite = Boolean(favorite.find(movie => {
    //   return movie.id === item.id;
    // }));
    // const isWatchlist = Boolean(watchlist.find(movie => {
    //   return movie.id === item.id;
    // }));

    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={
            imagePath
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : ""
          }
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="d-flex justify-content-between">
            <div className="card-text">Рейтинг: {item.vote_average}</div>
            <div>
              <FavoriteIcon
                item={item}
                //isFavorite={isFavorite}
                onClickFavorite={this.onClickFavorite}
              />
              <WatchlistIcon
                item={item}
                //isWatchlist={isWatchlist}
                onClickWatchlist={this.onClickWatchlist}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default AppContextHOC(MovieItem);
