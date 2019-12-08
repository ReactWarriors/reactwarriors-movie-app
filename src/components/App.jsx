import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";

const initialFilters = {
  sort_by: "popularity.desc",
  primary_release_year: "primary_release_year",
  with_genres: []
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: initialFilters,
      page: 1,
    }
  }

  onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  onChangePage = page => {
    this.setState({
      page
    })
  };

  updateTotalPages = value => {
    this.setState({
      total_pages: value
    })
  };

  onChangeGenres = genresArr => {
    this.setState(state => {
      return {
        filters: {
          ...state.filters,
          with_genres: genresArr
        }
      }
    })
  };

  onResetFilters = () => {
    this.setState({
      filters: initialFilters,
      page: 1
    })
  };


  render() {
    const {filters, page, genres} = this.state;

    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{width: "100%"}}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  filters={filters}
                  page={page}
                  genres={genres}
                  onChangeFilters={this.onChangeFilters}
                  onChangePage={this.onChangePage}
                  onChangeGenres={this.onChangeGenres}
                  onResetFilters={this.onResetFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePage={this.onChangePage}
              updateTotalPages={this.updateTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
