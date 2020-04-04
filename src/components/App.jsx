import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import Cookies from "universal-cookie";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import CallApi from "../api/api";
import { BrowserRouter, Route, Link } from "react-router-dom";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.initialState = {
      user: null,
      session_id: null,
      showLoginModal: false
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const session_id = cookies.get("session_id");

    // console.log("componentDidMount");

    if (session_id) {
      CallApi.get("/account", {
        params: { session_id: session_id }
      }).then(user => {
        this.updateSessionId(session_id);
        this.updateUser(user, session_id);
        // this.uploadFavorite(user, session_id);
        // this.uploadWatchlist(user, session_id);
      });
    }
  }

  updateUser = (user, session_id) => {
    // this.uploadFavorite(user, session_id);
    // this.uploadWatchlist(user, session_id);

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
      user: null
      // favorite: [],
      // watchlist: []
    });
  };

  toggleShowLogin = () => {
    this.setState(prevState => ({
      showLoginModal: !prevState.showLoginModal
    }));
  };

  render() {
    const { user, session_id, showLoginModal } = this.state;

    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user: user,
            session_id: session_id,
            // favorite: favorite,
            // watchlist: watchlist,
            updateUser: this.updateUser,
            updateSessionId: this.updateSessionId,
            onLogOut: this.onLogOut,
            showLoginModal: showLoginModal,
            toggleShowLogin: this.toggleShowLogin
            // toggleFavorite: this.toggleFavorite,
            // toggleWatchlist: this.toggleWatchlist
          }}
        >
          <div>
            <Header
              user={user}
              updateUser={this.updateUser}
              updateSessionId={this.updateSessionId}
            />
            <Link to="/movie">go to movie</Link>
            <Route exact path="/" component={MoviesPage} />
            <Route exact path="/movie" component={MoviePage} />
            {/* <MoviesPage /> */}
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}
