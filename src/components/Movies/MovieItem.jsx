import React from "react";
import {Bookmark, BookmarkBorder, Star, StarBorder} from "@material-ui/icons";
import AppContextHOC from "../HOC/AppContextHOC";

const MovieItem = ({item, session_id, favorite, watchlist, changeFavorite, changeWatchlist}) => (
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
          {
            session_id && favorite
              ? <Star onClick={() => changeFavorite(item.id, !favorite)}/>
              : <StarBorder onClick={() => changeFavorite(item.id, !favorite)}/>
          }
          {
            session_id && watchlist
              ? <Bookmark onClick={() => changeWatchlist(item.id, !watchlist)}/>
              : <BookmarkBorder onClick={() => changeWatchlist(item.id, !watchlist)}/>
          }
        </div>
      </div>
    </div>
  </div>
);

export default AppContextHOC(MovieItem);
