import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import CallApi from "../api/api";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      favourite: [],
      watchlist: [],
      filters: {
        sort_by: "popularity.desc",
        release_year: "",
        with_genres: [],
        page: 1,
      },
      totalPages: 1,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const session_id = cookies.get("session_id");
    const { page, sort_by } = this.state.filters;
    if (session_id) {
      CallApi.get("/account", {
        params: { session_id: session_id },
      })
        .then(user => {
          this.updateUser(user);
          this.updateSessionId(session_id);
        })
        .then(() => {
          CallApi.get(`/account/{account_id}/favourite/movies`, {
            params: {
              session_id: session_id,
              language: "ru-RU",
              page,
              sort_by,
            },
          }).then(Datafavourite => {
            this.updateFavourite(Datafavourite.results || []);
          });
        });
    }
  }

  updateFavourite = favourite => {
    this.setState({
      favourite,
    });
  };

  toggleFavourite = (id, value) => {
    console.log("id, value", id, value);
    const { favourite } = this.state;

    const newFavourite = [...favourite];
    this.updateFavourite(
      favourite.includes(id)
        ? newFavourite.filter(movieId => movieId !== id)
        : [...newFavourite, id]
    );
  };

  updateUser = user => {
    this.setState({
      user,
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000,
    });
    this.setState({
      session_id,
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
    });
  };

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
        [name]: value,
      },
    }));
  };

  clearFilters = () => {
    this.setState(this.initialState);
  };

  onChangeTotalPages = totalPages => {
    this.setState({
      totalPages,
    });
  };

  render() {
    const { filters, totalPages, user, session_id, favourite } = this.state;

    //console.log("this.updateUser", this.updateUser);

    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
        }}
      >
        <div>
          <Header
            user={user}
            updateUser={this.updateUser}
            updateSessionId={this.updateSessionId}
          />
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
                  favourite={favourite}
                  toggleFavourite={this.toggleFavourite}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
