import React from "react";
import {
  Star,
  Star_border,
  Bookmark,
  Bookmark_border,
} from "@material-ui/icons";

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;
    //const imagePath = item.poster_path;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={
            imagePath
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : ""
          }
          //src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <Star />
          <Bookmark />
        </div>
      </div>
    );
  }
}
