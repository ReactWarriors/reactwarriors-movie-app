import React from 'react'
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3 } from '../../api/api'
import queryString from 'querystring'

export default class MovieList extends React.Component {
  constructor() {
    super()

    this.state = {
      movies: [],
    }
  }

  getMovies = (filters, page) => {
    const { sort_by, with_genres, primary_release_year } = filters
    const queryStringParams = {
      api_key: API_KEY_3,
      language: 'ru-RU',
      sort_by,
      page,
    }
    if (with_genres.length > 0) {
      queryStringParams.with_genres = with_genres.join(',')
    }
    if (primary_release_year) {
      queryStringParams.primary_release_year = primary_release_year
    }
    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`
    fetch(link)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results,
        })
        this.props.onChangeTotalPage(data.total_pages)
      })
  }

  componentDidMount() {
    this.getMovies(this.props.filters, this.props.page)
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.props.onChangePage(1)
      this.getMovies(this.props.filters, 1)
    }

    if (this.props.page !== prevProps.page) {
      this.getMovies(this.props.filters, this.props.page)
    }
  }

  render() {
    const { movies } = this.state
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          )
        })}
      </div>
    )
  }
}
