import React, {Component} from "react";
import queryString from "query-string";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../../api/api";

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: false
    };
  }

  getMovies = (filters, page) => {

    this.setState({
      loading: true
    });

    const {sort_by, primary_release_year, with_genres} = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by,
      page,
      primary_release_year
    };

    if (with_genres.length > 0) {
      queryStringParams.with_genres = with_genres.join(",")
    }

    const link = `${API_URL}/discover/movie?${queryString.stringify(queryStringParams)}`;
    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results,
          loading: false
        });
        this.props.onChangeTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.props.onChangePage(1);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
    }
  }

  render() {
    const {movies} = this.state;

    return (
      <div className="row">
        {
          this.state.loading
            ? <div className="loader">Loading...</div>
            : [movies.map(movie => {
              return (
                <div key={movie.id} className="col-6 mb-4">
                  <MovieItem item={movie}/>
                </div>
              );
            }),
              !movies.length && <div className="mx-auto mt-4" key="notFounded">Ничего не найдено</div>]
        }
      </div>
    );
  }
}
