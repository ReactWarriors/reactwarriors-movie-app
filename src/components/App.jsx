import React from "react";
import Header from "./Header/Header";
import LoginModal from "./Modals/LoginModal";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import CallApi from "../api/api";
import _ from "lodash";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      favorites: [],
      watchlist: [],
      session_id: null,
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
    if (prevState.user === null && _.size(this.state.user)) {
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
      showLoginModal: false,
      watchlist: [],
      favorites: []
    })
  };

  getWatchlist = () => {
    const {session_id, user} = this.state;

      return CallApi.get(`/account/${user.id}/watchlist/movies`, {
        params: {
          session_id
        }
      })
        .then(data => {
          this.setState({
            watchlist: data.results
          })
        })
  };

  getFavorites = () => {
    const {session_id, user} = this.state;

      return CallApi.get(`/account/${user.id}/favorite/movies`, {
        params: {
          session_id
        }
      })
        .then(data => {
          this.setState({
            favorites: data.results
          })
        })
  };

  render() {
    const {
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
          <MoviesPage/>
          {
            showLoginModal && <LoginModal/>
          }
        </div>
      </AppContext.Provider>
    );
  }
}
