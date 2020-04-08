import React from "react";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
//import CallApi from "../../../api/api";

export default class MoviesPage extends React.Component {
  constructor() {
    super();

    this.initialState = {
      // favorite: [],
      // watchlist: [],
      filters: {
        sort_by: "popularity.desc",
        release_year: "",
        with_genres: [],
        page: 1
      },
      totalPages: 1,
      showLoginModal: false
    };

    this.state = this.initialState;
  }

  // toggleFavorite = item => {
  //   const { favorite } = this.state;
  //   let newArray;
  //   if (
  //     favorite.find(movie => {
  //       return movie.id === item.id;
  //     })
  //   ) {
  //     newArray = [...favorite].filter(movie => movie.id !== item.id);
  //   } else {
  //     newArray = [...favorite, item];
  //   }

  //   this.setState({
  //     favorite: newArray
  //   });
  // };

  // toggleWatchlist = item => {
  //   const { watchlist } = this.state;

  //   let newArray;
  //   if (
  //     watchlist.find(movie => {
  //       return movie.id === item.id;
  //     })
  //   ) {
  //     newArray = [...watchlist].filter(movie => movie.id !== item.id);
  //   } else {
  //     newArray = [...watchlist, item];
  //   }

  //   this.setState({
  //     watchlist: newArray
  //   });
  // };

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

  toggleShowLogin = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  };

  render() {
    const {
      filters,
      totalPages
    } = this.state;

    // console.log("MoviesPage.props", this.props);

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
