import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  getMovies = (filters, page) => {
    const {sort_by, primary_release_year, genres} = filters;
    const genres_list = genres.join(',');
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&primary_release_year=${primary_release_year}&page=${page}&with_genres=${genres_list}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results
        });
        this.props.onChange({
          target: {
            name: 'total_pages',
            value: data.total_pages
          }
        })
      });
  };

  componentDidMount() {
    const {filters, page} = this.props;
    this.getMovies(filters, page);
  }

  componentDidUpdate(prevProps) {
    const {filters: {sort_by, primary_release_year, genres}, filters, onChangePage, page} = this.props;
    if(sort_by !== prevProps.filters.sort_by || primary_release_year !== prevProps.filters.primary_release_year || genres.length !== prevProps.filters.genres.length) {
      onChangePage(1);
      this.getMovies(filters, 1);
    }
    if(page !== prevProps.page) {
      this.getMovies(filters, page);
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
