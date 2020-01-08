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
        page: 1,
        //totalPages: 1
      },
      totalPages: 1
    };
  }

  onChangeFilters = event => {
    //console.log("onChangeFilters.event.target", event.target);

    const { name, value } = event.target;
    this.сhangeFiltersState(name, value);
  };

  сhangeFiltersState = (name, value) => {

    console.log("total_pages2", name, value);

    this.setState({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    });

    // this.setState(prevState => ({
    //   filters: {
    //     ...prevState.filters,
    //     [name]: value
    //   }
    // }));
  };

  clearFilters = () => {
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
                  //onChangeGenre={this.onChangeGenre}
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
              onChangeTotalPages={this.onChangeTotalPages}
              //сhangeFiltersState={this.сhangeFiltersState}
            />
          </div>
        </div>
      </div>
    );
  }
}
