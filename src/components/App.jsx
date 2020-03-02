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
      favorite: [],
      watchlist: [],
      filters: {
        sort_by: "popularity.desc",
        release_year: "",
        with_genres: [],
        page: 1,
      },
      totalPages: 1,
      showLoginModal: false,
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const session_id = cookies.get("session_id");

    console.log("componentDidMount");

    if (session_id) {
      CallApi.get("/account", {
        params: { session_id: session_id },
      }).then(user => {
        this.updateSessionId(session_id);
        this.updateUser(user, session_id);
        this.uploadFavorite(user, session_id);
        this.uploadWatchlist(user, session_id);
      });
    }
  }

  toggleFavorite = item => {
    const { favorite } = this.state;

    const newArray = favorite.includes(item)
      ? [...favorite].filter(movie => movie.id !== item.id)
      : [...favorite, item];

    this.setState({
      favorite: newArray,
    });
  };

  toggleWatchlist = item => {
    const { watchlist } = this.state;

    const newArray = watchlist.includes(item)
      ? [...watchlist].filter(movie => movie.id !== item.id)
      : [...watchlist, item];

    this.setState({
      watchlist: newArray,
    });
  };

  uploadFavorite = (user, session_id) => {
    // const { session_id, user } = this.state;

    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then(data => {
      this.setState({
        favorite: data.results,
      });
    });
  };

  uploadWatchlist = (user, session_id) => {
    //const { session_id, user } = this.state;

    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU",
      },
    }).then(data => {
      this.setState({
        watchlist: data.results,
      });
    });
  };

  updateUser = user => {
    this.setState({
      user,
      showLoginModal: false,
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
      favorite: [],
      watchlist: [],
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

  toggleShowLogin = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal,
    }));
  };

  render() {
    const {
      filters,
      totalPages,
      user,
      session_id,
      favorite,
      watchlist,
      showLoginModal,
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          favorite: favorite,
          watchlist: watchlist,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          showLoginModal: showLoginModal,
          toggleShowLogin: this.toggleShowLogin,
          toggleFavorite: this.toggleFavorite,
          toggleWatchlist: this.toggleWatchlist,
          uploadFavorite: this.uploadFavorite,
          uploadWatchlist: this.uploadWatchlist,
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
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
