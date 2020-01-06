import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: {
        sort_by: "popularity.desc",
        release_year: "",
        genres: [],
        page: 1
      },
      totalPages: 1
    };
  }

  onChangeFilters = event => {
    //console.log("onChangeFilters.event.target", event.target);

    const { name, value } = event.target;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  сhangeFiltersState = (name, value) => {
    //console.log("сhangeFiltersState");
    //console.log("name, value", name, value);

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  clearFilters = event => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        sort_by: "popularity.desc",
        release_year: "",
        genres: [],
        page: 1
      }
    }));
  };

  onChangeTotalPages = totalPages => {
    this.setState({
      totalPages
    });
  };

  // onChangePage = page => {
  //   this.setState(prevState => ({
  //     filters: {
  //       ...prevState.filters,
  //       page
  //     }
  //   }));
  // };

  render() {
    const { filters, totalPages } = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  totalPages={totalPages}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  //onChangePage={this.onChangePage}
                  onChangeGenre={this.onChangeGenre}
                  сhangeFiltersState={this.сhangeFiltersState}
                  clearFilters={this.clearFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              onChangeFilters={this.onChangeFilters}
              //onChangePage={this.onChangePage}
              onChangeTotalPages={this.onChangeTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
