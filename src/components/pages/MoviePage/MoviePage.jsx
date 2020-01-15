import React from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Icons/FavoriteIcon";
import WatchlistIcon from "../../Icons/WatchlistIcon";

export default class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      details: [],
      genres: []
    }
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  getMovieDetails = () => {
    const queryStringParams = {
      language: "ru-Ru",
    };

    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: queryStringParams
    })
      .then(data => {
        this.setState({
          details: data,
          genres: data.genres
        })
      });
  };

  render() {
    const {details, genres} = this.state;

    return (
      <div className="container pt-1">
        <div className="card border-light ">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/w300${details.poster_path}`}
                alt="poster"
                className="rounded"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title mb-1">
                  {details.title}
                </h1>
                <h6 className="text-muted">{details.original_title}</h6>
                {
                  details.tagline
                    ? <small className="text-muted">Слоган: {details.tagline}</small>
                    : null
                }
                <div className="row justify-content-between mt-4">
                  <div className="col-3">
                    <h6>Дата релиза</h6>
                    <p>{details.release_date}</p>
                  </div>
                  <div className="col-3">
                    <h6>Рейтинг</h6>
                    <p>{details.vote_average}</p>
                  </div>
                  <div className="col-3">
                    <h6>Время</h6>
                    <p>{details.runtime} мин.</p>
                  </div>
                  <div className="col-3">
                    <h6>Добавить</h6>
                    <FavoriteIcon movieId={details.id}/>
                    <WatchlistIcon movieId={details.id}/>
                  </div>
                </div>
                <div>
                  <h6>Жанры</h6>
                  <p>{genres.map(genre =>genre.name).join(", ")}</p>
                </div>
                <div className="mt-4">
                  <h6>Описание:</h6>
                  <p>{details.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
