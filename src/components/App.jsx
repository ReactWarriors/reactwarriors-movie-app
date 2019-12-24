import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();


const initialFilters = {
  sort_by: "popularity.desc",
  primary_release_year: "primary_release_year",
  with_genres: [],
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      session_id: null,
      filters: initialFilters,
      page: 1,
      total_pages: 1,
    }
  }

  componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      })
        .then(user => {
          this.updateUser(user);
        })
    }

  }

  updateUser = user => {
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

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

  onChangeTotalPages = value => {
    this.setState({
      total_pages: value
    })
  };

  onResetFilters = () => {
    this.setState({
      filters: initialFilters,
      page: 1
    })
  };

  render() {
    const {filters, page, total_pages, genres, user, session_id} = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          updateUser: this.updateUser,
          session_id,
          updateSessionId: this.updateSessionId
        }}
      >
        <div>
          <Header
            user={user}
            updateSessionId={this.updateSessionId}
          />
          <div className="container pt-1">
            <div className="row">
              <div className="col-4">
                <div className="card sticky-top">
                  <div className="card-body py-1">
                    <h3>Фильтры:</h3>
                    <Filters
                      filters={filters}
                      page={page}
                      total_pages={total_pages}
                      genres={genres}
                      onChangeFilters={this.onChangeFilters}
                      onChangePage={this.onChangePage}
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
                  onChangeTotalPages={this.onChangeTotalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
