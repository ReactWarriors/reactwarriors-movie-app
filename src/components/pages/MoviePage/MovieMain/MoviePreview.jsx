import React from "react";
import FavoriteIcon from "../../../Icons/FavoriteIcon";
import WatchlistIcon from "../../../Icons/WatchlistIcon";
import CallApi from "../../../../api/api";
import {Route, withRouter} from "react-router-dom";

class MoviePreview extends React.Component {
  constructor() {
    super();

    this.state = {
      details: [],
      loading: false
    }
  }

  componentDidMount() {
    this.getMovieDescription();
  }

  getMovieDescription = () => {
    this.setState({
      loading: true
    });

    const queryStringParams = {
      language: "ru-Ru",
    };

    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: queryStringParams
    })
      .then(data => {
        this.setState({
          details: data,
          loading: false
        })
      });
  };

  render() {
    const {
      details,
      loading
    } = this.state;

    return (
      <Route>
        {
          loading
            ? <div className="loader">Loading...</div>
            : <div className="card border-light mb-2">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${details.backdrop_path || details.poster_path}`}
                    alt="poster"
                    className="rounded"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body pt-0">
                    <h3 className="card-title mb-1">
                      {details.title}
                    </h3>
                    <h6 className="text-muted">{details.original_title}</h6>
                    {
                      details.tagline
                        ? <small className="text-muted">Слоган: {details.tagline}</small>
                        : null
                    }
                    <div className="row justify-content-between mt-4">
                      <div className="col-3">
                        <h6>Рейтинг</h6>
                        <p>{details.vote_average}</p>
                      </div>
                      <div className="col-3">
                        <h6>Добавить</h6>
                        <FavoriteIcon movieId={details.id}/>
                        <WatchlistIcon movieId={details.id}/>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h6>Описание:</h6>
                      <p>{details.overview}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </Route>
    )
  }
}

export default withRouter(MoviePreview);
