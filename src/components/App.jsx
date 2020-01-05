import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import LoginModal from "./Modals/LoginModal";
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
      favorites: [],
      watchlist: [],
      session_id: null,
      filters: initialFilters,
      page: 1,
      total_pages: 1,
      showLoginModal: false,
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
          this.updateSessionId(session_id);
          this.updateUser(user);
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user !== prevState.user) {
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
      user,
      showLoginModal: false
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

  getWatchlist = () => {
    const {session_id, user} = this.state;

    if (user) {
      return CallApi.get(`/account/${user.id}/watchlist/movies`, {
        params: {
          session_id
        }
      })
        .then(data => {
          this.setState({
            watchlist: data.results.map(elem => elem.id)
          })
        })
    }
    this.setState({
      watchlist: []
    })
  };

  getFavorites = () => {
    const {session_id, user} = this.state;

    if (user) {
      return CallApi.get(`/account/${user.id}/favorite/movies`, {
        params: {
          session_id
        }
      })
        .then(data => {
          this.setState({
            favorites: data.results.map(elem => elem.id)
          })
        })
    }
    this.setState({
      favorites: []
    })
  };

  render() {
    const {
      filters,
      page,
      total_pages,
      genres,
      user,
      session_id,
      favorites,
      watchlist,
      showLoginModal,
    } = this.state;

    return (
      <AppContext.Provider
        value={{
          user,
          updateUser: this.updateUser,
          session_id,
          favorites: favorites,
          watchlist: watchlist,
          updateSessionId: this.updateSessionId,
          onLogOut: this.onLogOut,
          showLoginModal,
          toggleModal: this.toggleModal,
          getWatchlist: this.getWatchlist,
          getFavorites: this.getFavorites
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
            showLoginModal && <LoginModal/>
          }
        </div>
      </AppContext.Provider>
    );
  }
}
