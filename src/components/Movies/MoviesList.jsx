import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      totalPages: 1,
    };
  }

  getMovies = (filters, page) => {
    const { sort_by } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // console.log("data.total_pages", data.total_pages);
        // console.log("data.page", data.page);
        this.setState({
          movies: data.results,
          page: data.page,
          totalPages: data.total_pages,
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      console.log("this.state.totalPages1", this.state.totalPages);
      this.props.onChangePage(1, this.state.totalPages);
      this.getMovies(this.props.filters, 1);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page);
      //this.props.onChangePage(this.props.page, this.state.totalPages);
    }
  }

  render() {
    const { movies } = this.state;
    // console.log("filters", this.props.filters);
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
