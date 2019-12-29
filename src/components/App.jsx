import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import DisplayModal from "./Modals/DisplayModal";
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
      favorites: new Set(),
      watchlist: new Set(),
      session_id: null,
      account_id: undefined,
      filters: initialFilters,
      page: 1,
      total_pages: 1,
      showLoginModal: false,
      submittingFavorites: false,
      submittingWatchlist: false
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
          this.updateSessionId(session_id);
          this.updateAccountId(user.id);
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.account_id !== prevState.account_id) {
      this.getFavorites();
      this.getWatchlist();
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }))
  };

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

  updateAccountId = id => {
    this.setState({
      account_id: id
    })
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      account_id: null,
      showLoginModal: false
    })
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

  changeFavorite = (id, isFavorite) => {
    const {session_id, account_id} = this.state;

    if (session_id) {
      this.setState({
        submittingFavorites: true
      });
      CallApi.post(`/account/${account_id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: id,
          favorite: isFavorite
        }
      })
        .then(() => {
          return this.getFavorites();
        })
        .then(() => {
          this.setState({
            submittingFavorites: false
          })
        })
    } else {
      this.toggleModal();
    }
  };

  changeWatchlist = (id, isWatchlist) => {
    const {session_id, account_id} = this.state;

    if (session_id) {
      this.setState({
        submittingWatchlist: true
      });
      CallApi.post(`/account/${account_id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: id,
          watchlist: isWatchlist
        }
      })
        .then(() => {
          return this.getWatchlist();
        })
        .then(() => {
          this.setState({
            submittingWatchlist: false
          })
        })
    } else {
      this.toggleModal();
    }
  };

  getWatchlist = () => {
    const {session_id, account_id} = this.state;

    if (session_id) {
      return CallApi.get(`/account/${account_id}/watchlist/movies`, {
        params: {
          session_id
        }
      })
        .then(data => {
          this.setState({
            watchlist: new Set(data.results.map(elem => elem.id))
          })
        })
        .catch(() => {
          this.setState({
            watchlist: new Set()
          })
        })
    }
    this.setState({
      watchlist: new Set()
    });
  };

  getFavorites = () => {
    const {session_id, account_id} = this.state;

    if (session_id) {
      return CallApi.get(`/account/${account_id}/favorite/movies`, {
        params: {
          session_id
        }
      })
        .then(data => {
          this.setState({
            favorites: new Set(data.results.map(elem => elem.id))
          })
        })
        .catch(() => {
          this.setState({
            favorites: new Set()
          })
        })
    }
    this.setState({
      favorites: new Set()
    })
  };

  render() {
    const {
      filters,
      page,
      total_pages,
      genres,
      user,
      account_id,
      session_id,
      favorites,
      watchlist,
      showLoginModal,
      submittingFavorites,
      submittingWatchlist
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          updateUser: this.updateUser,
          session_id,
          account_id: account_id,
          favorites: favorites,
          watchlist: watchlist,
          updateSessionId: this.updateSessionId,
          updateAccountId: this.updateAccountId,
          onLogOut: this.onLogOut,
          showLoginModal,
          toggleModal: this.toggleModal,
          changeFavorite: this.changeFavorite,
          changeWatchlist: this.changeWatchlist,
          submittingFavorites: submittingFavorites,
          submittingWatchlist: submittingWatchlist
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
                  session_id={session_id}
                  onChangePage={this.onChangePage}
                  onChangeTotalPages={this.onChangeTotalPages}
                  toggleModal={this.toggleModal}
                />
              </div>
            </div>
          </div>
          {
            !user && <DisplayModal/>
          }
        </div>
      </AppContext.Provider>
    );
  }
}
