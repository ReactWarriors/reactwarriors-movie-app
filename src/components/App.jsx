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
        genres: {}
      },
      page: 1,
      totalPages: 1,
    };
  }

  onChangeFilters = event => {
    //console.log("onChangeFilters", this);
    const { name, value } = event.target
    // const value = event.target.value;
    // const name = event.target.name;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }));
  };

  setGenres = genres => {
    //console.log("onChangeFilters", this);

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        genres: genres,
      },
    }));
  };

  clearFilters = event => {
    //console.log("onChangeFilters", this);

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        sort_by: "popularity.desc",
        release_year: ""
      },
      page: 1,
    }));
  };

  onChangeTotalPages = totalPages => {
    this.setState({
      totalPages,
    });
  };

  onChangePage = page => {
    this.setState({
      page,
    });
  };

  render() {
    const { filters, page, totalPages } = this.state;

    // console.log("filters", filters);

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  totalPages={totalPages}
                  filters={filters}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  clearFilters={this.clearFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangeFilters={this.onChangeFilters}
              onChangePage={this.onChangePage}
              onChangeTotalPages={this.onChangeTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
