import React, {Component} from "react";
import MovieItem from "./MovieItem";
import {API_URL, API_KEY_3} from "../../api/api";
import Pagination from "./Pagination";

export default class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      total_pages: 1,
    };
  }

  getMovies = (filters, page) => {
    const {sort_by, primary_release_year, with_genres} = filters;

    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}&with_genres=${with_genres}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          total_pages: data.total_pages,
        });
      });
  };

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.primary_release_year, this.props.page);
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
    const {movies, total_pages} = this.state;
    const {page, onChangePage} = this.props;

    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie}/>
            </div>
          );
        })}
        {!movies.length && <div className="mx-auto mt-4">Ничего не найдено</div>}
        {
          !!movies.length &&
          <Pagination
            page={page}
            total_pages={total_pages}
            onChangePage={onChangePage}
          />
        }
      </div>
    );
  }
}
