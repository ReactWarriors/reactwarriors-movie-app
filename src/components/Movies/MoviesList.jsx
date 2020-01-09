import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import _ from "lodash";
import queryString from "querystring";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  static propTypes = {
    onChangeTotalPages: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      movies: [],
      totalPages: 1,
    };
  }

  getMovies = (filters, onChangeTotalPages) => {
    const { sort_by, release_year, genres, page } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by,
      page,
    };

    if (genres.length > 0) {
      queryStringParams.with_genres = genres.join();
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
    //   (genres.length > 0 ? `&with_genres=${genres.join()}` : "");

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          page: data.page,
          totalPages: data.total_pages,
        });
        return data.total_pages;
      })
      .then(total_pages => {
        onChangeTotalPages(total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.onChangeTotalPages);
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.filters, prevProps.filters)) {
      this.getMovies(this.props.filters, this.props.onChangeTotalPages);
    }
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="row">
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
