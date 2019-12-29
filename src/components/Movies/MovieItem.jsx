import React from "react";
import FavoriteIcon from "../Icons/FavoriteIcon";
import WatchlistIcon from "../Icons/WatchlistIcon";

const MovieItem = ({item}) => (
  <div className="card" style={{width: "100%"}}>
    <img
      className="card-img-top card-img--height"
      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
      item.poster_path}`}
      alt=""
    />
    <div className="card-body">
      <h6 className="card-title">{item.title}</h6>
      <div className="d-flex justify-content-between">
        <div className="card-text">Рейтинг: {item.vote_average}</div>
        <div>
          <FavoriteIcon id={item.id}/>
          <WatchlistIcon id={item.id}/>
        </div>
      </div>
    </div>
  </div>
);

export default MovieItem;
