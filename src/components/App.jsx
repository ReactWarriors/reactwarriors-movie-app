import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: "popularity.desc",
        release_year: "",
        with_genres: [],
        page: 1
      },
      totalPages: 1
    };

    this.state = this.initialState;
  }

  onChangeFilters = event => {
    const { name, value } = event.target;
    this.updateFilters(name, value);
  };

  updateFilters = (name, value) => {
    // this.setState({
    //   filters: {
    //     ...this.state.filters,
    //     [name]: value
    //   }
    // });

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  clearFilters = () => {
    this.setState(this.initialState);
  };

  onChangeTotalPages = totalPages => {
    this.setState({
      totalPages
    });
  };

  render() {
    const { filters, totalPages } = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  totalPages={totalPages}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  updateFilters={this.updateFilters}
                  clearFilters={this.clearFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              onChangeFilters={this.onChangeFilters}
              onChangeTotalPages={this.onChangeTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
