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
        page: 1
      },
      totalPages: 1,
      showLogin: false
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const session_id = cookies.get("session_id");

    if (session_id) {
      CallApi.get("/account", {
        params: { session_id: session_id }
      }).then(() => {
        this.updateSessionId(session_id);
        this.updateUser(this.state.user);
      });
    }
  }

  toggleFavorite = (id, value) => {
    // console.log("id, value", id, value);
    const { favorite } = this.state;
    const session_id = cookies.get("session_id");

    if (!session_id) {
      this.setState({
        showLogin: true
      });
      return;
    }

    CallApi.post(`/account/{account_id}/favorite`, {
      params: {
        session_id: session_id,
        media_type: "movie",
        media_id: id,
        favorite: value
      }
    }).then(response => {
      //console.log("response", response);

      const newArray = favorite.includes(id)
        ? [...favorite].filter(movieId => movieId !== id)
        : [...favorite, id];

      this.setState({
        favorite: newArray
      });
    });
  };

  toggleWatchlist = (id, value) => {
    // console.log("id, value", id, value);
    const { watchlist } = this.state;
    const session_id = cookies.get("session_id");

    if (!session_id) {
      this.setState({
        showLogin: true
      });
      return;
    }

    CallApi.post(`/account/{account_id}/watchlist`, {
      params: {
        session_id: session_id,
        media_type: "movie",
        media_id: id,
        watchlist: value
      }
    }).then(response => {
      console.log("response", response);

      const newArray = watchlist.includes(id)
        ? [...watchlist].filter(movieId => movieId !== id)
        : [...watchlist, id];

      this.setState({
        watchlist: newArray
      });
    });
  };

  uploadFavoriteAndWatchlist = () => {
    let favorite = [],
      watchlist = [];
    const { session_id } = this.state;

    CallApi.get(`/account/{account_id}/favorite/movies`, {
      params: {
        session_id: session_id,
        language: "ru-RU"
      }
    }).then(data => {
      favorite = data.results.map(elem => {
        return elem.id;
      });

      CallApi.get(`/account/{account_id}/watchlist/movies`, {
        params: {
          session_id: session_id,
          language: "ru-RU"
        }
      }).then(data => {
        watchlist = data.results.map(elem => {
          return elem.id;
        });

        this.setState({
          favorite,
          watchlist
        });
      });
    });
  };

  updateUser = user => {

    this.uploadFavoriteAndWatchlist(this.state.session_id);

    this.setState({
      user,
      showLogin: false
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

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      favorite: [],
      watchlist: []
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
      showLogin: !prevState.showLogin
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
      showLogin
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user: user,
          session_id: session_id,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          showLogin: showLogin,
          toggleShowLogin: this.toggleShowLogin
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
                  favorite={favorite}
                  watchlist={watchlist}
                  toggleFavorite={this.toggleFavorite}
                  toggleWatchlist={this.toggleWatchlist}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
