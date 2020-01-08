import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  static propTypes = {
    onChangeTotalPages: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      movies: [],
      totalPages: 1
    };
  }

  getMovies = (filters, onChangeTotalPages) => {
    const { sort_by, release_year, genres, page } = filters;
    const link =
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}` +
      (release_year ? `&primary_release_year=${release_year}` : "") +
      (genres ? `&with_genres=${genres.join()}` : "");

    //console.log("link", link);

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          page: data.page,
          totalPages: data.total_pages
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
    if (this.props.filters !== prevProps.filters) {
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
