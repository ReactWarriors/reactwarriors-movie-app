import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '2019',
        with_genres: []
      },
      page: 1,
      total_pages: ''
    }
  }

  onChangePage = (page) => {
    this.setState({
      page
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  onReset = () => {
    this.setState({
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '2019',
        with_genres: []
      }
    })
  };

  onChangeFilters = event => {
    const name = event.target.name;
    const value = event.target. value;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }))
  };

  render() {
    const {filters, page, total_pages} = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  page={page}
                  total_pages={total_pages}
                  onChange={this.onChange}
                  onReset={this.onReset}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChange={this.onChange}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
}
