import React from "react";
import CallApi from "../../../api/api";
import FavoriteIcon from "../../Icons/FavoriteIcon";
import WatchlistIcon from "../../Icons/WatchlistIcon";
import MovieTabs from "../MoviesPage/MovieTabs/MovieTabs";
import {BrowserRouter as Router} from "react-router-dom";

export const MovieContext = React.createContext();

export default class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      details: [],
      genres: [],
      production_countries: [],
      production_companies: [],
      cast: [],
      videos: [],
      loading: false
    }
  }

  componentDidMount() {
    this.getMovieDetails();
    this.getCredits();
    this.getVideos();
  }

  getMovieDetails = () => {
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
          genres: data.genres,
          production_countries: data.production_countries,
          production_companies: data.production_companies,
          loading: false
        })
      });
  };

  getCredits = () => {
    this.setState({
      loading: true
    });

    const queryStringParams = {
      language: "ru-Ru",
    };

    CallApi.get(`/movie/${this.props.match.params.id}/credits`, {
      params: queryStringParams
    })
      .then(data => {
        this.setState({
          cast: data.cast,
          loading: false
        })
      });
  };

  getVideos = () => {
    this.setState({
      loading: true
    });

    const queryStringParams = {
      language: "ru-Ru",
    };

    CallApi.get(`/movie/${this.props.match.params.id}/videos`, {
      params: queryStringParams
    })
      .then(data => {
        this.setState({
          videos: data.results,
          loading: false
        })
      });
  };

  render() {
    const {
      details,
      genres,
      production_countries,
      production_companies,
      cast,
      videos,
      loading
    } = this.state;

    return (
      <Router>
        <MovieContext.Provider
          value={{
            details,
            genres,
            production_countries,
            production_companies,
            cast,
            videos,
            loading
          }}
        >
          <div className="container pt-1">
            <div className="card border-light mb-2">
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
            <MovieTabs
              movieId={details.id}
            />
          </div>
        </MovieContext.Provider>
      </Router>
    )
  }
}
