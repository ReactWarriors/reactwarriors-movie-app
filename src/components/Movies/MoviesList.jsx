import React from 'react'
import MovieItem from './MovieItem'
import { API_URL, API_KEY_3 } from '../../api/api'

export default class MovieList extends React.Component {
  constructor() {
    super()

    this.state = {
      movies: [],
      total_pages: null,
    }
  }

  getMovies = (filters, page) => {
    const { sort_by, year } = filters
    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}${
      year === 'Год выпуска' ? '' : `&primary_release_year=${year}`
    }`
    fetch(link)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          movies: data.results,
          total_pages: data.total_pages,
        })
      })
  }

  componentDidMount() {
    // console.log('componentDidMount')
    this.getMovies(this.props.filters, this.props.page)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
  //     this.getMovies(nextProps.filters)
  //   }
  // }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate')
    if (this.state.total_pages !== prevProps.total_pages) {
      this.props.onChangeTotalPage(this.state.total_pages)
    }
    if (
      this.props.filters.sort_by !== prevProps.filters.sort_by ||
      this.props.filters.year !== prevProps.filters.year
    ) {
      this.props.onChangePage(1)
      this.getMovies(this.props.filters, 1)
    }
    if (
      this.props.page !== prevProps.page ||
      this.props.filters.year !== prevProps.filters.year
    ) {
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
