import React from "react";
import {Route} from "react-router";
import {Redirect, Switch} from "react-router-dom";
import CallApi from "../../../api/api";
import MovieTabs from "./MovieTabs/MovieTabs";
import MoviePreview from "./MovieMain/MoviePreview";
import MovieDetail from "./MovieMain/MovieDetail";
import MovieVideos from "./Video/MovieVideos";
import MovieCredits from "./Credits/MovieCredits";

class MoviePage extends React.Component {
  constructor() {
    super();

    this.state = {
      movie: null,
      loading: true
    }
  }

  componentDidMount() {
    this.getMovie();
  }

  getMovie = () => {
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
          movie: data,
          loading: false
        })
      });
  };


  render() {
    const {loading, movie} = this.state;
    const movieId = this.props.match.params.id;
    return (
      loading
        ? <div className="loader">Loading...</div>
        : <div className="container pt-1">
            <div className="card border-light mb-2">
              <MoviePreview movie={movie}/>
          </div>
          <div className="container">
            <MovieTabs/>
            <div>
              <Switch>
                <Route path={`/movie/:id/detail`}>
                  <MovieDetail movie={movie}/>
                </Route>
                <Route path={`/movie/:id/videos`} component={MovieVideos}/>
                <Route path={`/movie/:id/credits`} component={MovieCredits}/>
                <Route exact path={`/movie/${movieId}`}>
                  <Redirect to={`/movie/${movieId}/detail`}/>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
    )
  }
}

export default MoviePage;
