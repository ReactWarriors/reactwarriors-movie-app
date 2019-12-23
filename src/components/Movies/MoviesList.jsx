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

  getMovies = (filters, page, onChangeTotalPages) => {
    const { sort_by } = filters;
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}`;
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
    this.getMovies(this.props.filters, 1, this.props.onChangeTotalPages);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters.sort_by !== prevProps.filters.sort_by) {
      //console.log("this.state.totalPages1", this.state.totalPages);

      this.props.onChangePage([1, this.state.totalPages]);
      this.getMovies(this.props.filters, 1, this.props.onChangeTotalPages);
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(
        this.props.filters,
        this.props.page,
        this.props.onChangeTotalPages
      );
      console.log("this.state.totalPages2", this.state.totalPages);
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
