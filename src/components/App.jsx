import React from 'react'
import Filters from './Filters/Filters'
import MoviesList from './Movies/MoviesList'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      filters: {
        sort_by: 'popularity.desc',
      },
      page: 1,
    }
  }

  onChangeFilters = e => {
    const value = e.target.value
    const name = e.target.name
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }))
  }

  onChangePage = page => {
    this.setState({
      page,
    })
  }

  render() {
    const { filters, page } = this.state
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              page={page}
              filters={filters}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    )
  }
}
