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
    const genres_list = with_genres.join(',');
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&primary_release_year=${primary_release_year}&page=${page}&with_genres=${genres_list}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.onChangeTotalPages(data.total_pages);
      });
  };

  componentDidMount() {
    const {filters, page} = this.props;
    this.getMovies(filters, page);
    this.setState({
      isLoading: false
    })
  }

  componentDidUpdate(prevProps) {
    const {
      filters,
      onChangePage,
      page
    } = this.props;
    if(filters !== prevProps.filters) {
      onChangePage(1);
      this.getMovies(filters, 1);
      this.setState({
        isLoading: false
      })
    }
    if(page !== prevProps.page) {
      this.getMovies(filters, page);
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const { movies, isLoading } = this.state;
    return (
      <div className="row">
        <Loader isLoading={isLoading} />
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
