import React from "react";
import FavoriteIcon from "../../../Icons/FavoriteIcon";
import WatchlistIcon from "../../../Icons/WatchlistIcon";

class MoviePreview extends React.Component {

  render() {
    const {movie} = this.props;

    return (
      <div className="row justify-content-center">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path || movie.poster_path}`}
            alt="poster"
            className="rounded"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body pt-0">
            <h3 className="card-title mb-1">
              {movie.title}
            </h3>
            <h6 className="text-muted">{movie.original_title}</h6>
            {
              movie.tagline
                ? <small className="text-muted">Слоган: {movie.tagline}</small>
                : null
            }
                    <div className="row justify-content-between mt-4">
                      <div className="col-3">
                        <h6>Рейтинг</h6>
                        <p>{movie.vote_average}</p>
                      </div>
                      <div className="col-3">
                        <h6>Добавить</h6>
                        <FavoriteIcon movieId={movie.id}/>
                        <WatchlistIcon movieId={movie.id}/>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h6>Описание:</h6>
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
    )
  }
}

export default MoviePreview;
