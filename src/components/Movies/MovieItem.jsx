import React from "react";
import PropTypes from "prop-types";
import FavoriteIcon from "./FavoriteIcon";
import WatchlistIcon from "./WatchlistIcon";
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "../../api/api";

class MovieItem extends React.Component {
  onClickFavorite = (item, value) => {
    const { session_id, toggleFavorite, toggleShowLogin } = this.props;

    if (!session_id) {
      toggleShowLogin();
      return;
    }

    CallApi.post(`/account/{account_id}/favorite`, {
      params: {
        session_id: session_id,
        media_type: "movie",
        media_id: item.id,
        favorite: value
      }
    }).then(
      response => {
        toggleFavorite(item);
      },
      reject => {}
    );
  };

  onClickWatchlist = (item, value) => {
    const { session_id, toggleWatchlist, toggleShowLogin } = this.props;

    if (!session_id) {
      toggleShowLogin();
      return;
    }

    CallApi.post(`/account/{account_id}/watchlist`, {
      params: {
        session_id: session_id,
        media_type: "movie",
        media_id: item.id,
        watchlist: value
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

    
    const isFavorite = Boolean(favorite.find(movie => {
      return movie.id === item.id;
    }));
    const isWatchlist = Boolean(watchlist.find(movie => {
      return movie.id === item.id;
    }));
    //  => {
    //   return movie.id === item.id;
    // });
    // console.log("favorite", favorite);
    // console.log("item", item);

    //console.log("isFavorite", isFavorite);

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
                favorite={favorite}
                isFavorite={isFavorite}
                onClickFavorite={this.onClickFavorite}
              />
              <WatchlistIcon
                item={item}
                watchlist={watchlist}
                isWatchlist={isWatchlist}
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
