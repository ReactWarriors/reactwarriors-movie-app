import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import Loader from '../Loader';

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: true
    };
  }

  getMovies = (filters, page) => {
    const {sort_by, primary_release_year, with_genres} = filters;
    const queryString = require('query-string');
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by,
      primary_release_year,
      page,
      with_genres: with_genres.join(',')
    };
    const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          isLoading: false
        });
        this.props.onChangeTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    const {filters, page} = this.props;
    this.getMovies(filters, page);
  }

  componentDidUpdate(prevProps) {
    const {
      filters,
      onChangePage,
      page
    } = this.props;
    if(filters !== prevProps.filters) {
      this.setState({
        isLoading: true
      });
      onChangePage(1);
      this.getMovies(filters, 1);
    }
    if(page !== prevProps.page) {
      this.setState({
        isLoading: true
      });
      this.getMovies(filters, page);
    }
  }

  render() {
    const { movies, isLoading } = this.state;
    return (
      <div className="row">
        {isLoading ? <Loader /> :
          <>
            {movies.map(movie => {
              return (
                <div key={movie.id} className="col-6 mb-4">
                  <MovieItem item={movie}/>
                </div>
              );
            })
            }
          </>
        }
      </div>
    );
  }
}
