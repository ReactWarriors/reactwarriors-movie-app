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
        genres: []
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onReset = () => {
    this.setState({
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '2019',
        genres: []
      }
    })
  };

  onChangeFilters = (e) => {
    const updatedGenres = this.state.filters.genres;
    if(e.target.checked) {
      updatedGenres.push(e.target.value);
    } else {
      let index = updatedGenres.indexOf(e.target.value);
      updatedGenres.splice(index, 1);
    }
    const newFilters = {
      ...this.state.filters,
      [e.target.name]: e.target.value,
      genres: updatedGenres
    };
    this.setState({
      filters: newFilters
    });
  };

  render() {
    const {filters, page, total_pages} = this.state;
    console.log(this.state.filters.genres)

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
