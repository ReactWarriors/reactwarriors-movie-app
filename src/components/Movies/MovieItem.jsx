import React from "react";
import FavoriteIcon from "../Icons/FavoriteIcon";
import WatchlistIcon from "../Icons/WatchlistIcon";
import {Link} from "react-router-dom";
import Image from "../UI/Image";

const MovieItem = ({item}) => (
  <div className="card" style={{width: "100%"}}>
    <Image
      className="card-img-top card-img--height"
      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
      item.poster_path}`}
      alt=""
    />
    <div className="card-body">
      <Link
        to={`/movie/${item.id}`}
        className="card-title"
      >
        {item.title}
      </Link>
      <div className="d-flex justify-content-between">
        <div className="card-text">Рейтинг: {item.vote_average}</div>
        <div>
          <FavoriteIcon movieId={item.id}/>
          <WatchlistIcon movieId={item.id}/>
        </div>
      </div>
    </div>
  </div>
);

export default MovieItem;
