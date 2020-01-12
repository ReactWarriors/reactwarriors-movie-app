import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import _ from "lodash";
import queryString from "querystring";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  static propTypes = {
    onChangeTotalPages: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      loaded: false,
      movies: [],
      totalPages: 1
    };

  }

  getMovies = filters => {
    const { sort_by, release_year, with_genres, page } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by,
      page
    };

    if (with_genres.length > 0) {
      queryStringParams.with_genres = with_genres.join();
    }
    if (release_year) {
      queryStringParams.primary_release_year = release_year;
    }
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`;

    // const oldLink =
    //   `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}` +
    //   (release_year ? `&primary_release_year=${release_year}` : "") +
    //   (with_genres.length > 0 ? `&with_genres=${with_genres.join()}` : "");

    fetch(link)
      .then(response => {
        this.setState({ loaded: true });
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          page: data.page,
          totalPages: data.total_pages
        });
        this.props.onChangeTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.filters, prevProps.filters)) {
      this.setState({ loaded: false });
      this.getMovies(this.props.filters, this.props.onChangeTotalPages);
    }
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="row">
        {!this.state.loaded && <div className="loader"></div>}

        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
