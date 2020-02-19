import React, { Component } from "react";
import PropTypes from "prop-types";
import MoviesList from "./MoviesList";
import _ from "lodash";
import queryString from "querystring";
import CallApi from "../../api/api";

export default class MoviesContainer extends Component {
  static propTypes = {
    onChangeTotalPages: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      loaded: false,
      movies: [],
      totalPages: 1,
    };
  }

  getMovies = filters => {
    const { sort_by, release_year, with_genres, page } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by,
      page,
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

    CallApi.get("/discover/movie", {
      params: queryStringParams,
    })
      .then(response => {
        this.setState({ loaded: true });
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          page: data.page,
          totalPages: data.total_pages,
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
    return <MoviesList movies={movies} loaded={this.state.loaded} />;
  }
}
