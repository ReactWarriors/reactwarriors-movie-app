import React from "react";
import Header from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Cookies from "universal-cookie";
import { BrowserRouter, Route } from "react-router-dom";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      session_id: cookies.get("session_id"),
      isAuth: false
    };
  }

  updateAuth = (user, session_id) => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id,
      user,
      isAuth: true
    });
  };

  onLogOut = () => {
    cookies.remove("session_id");
    this.setState({
      session_id: null,
      user: null,
      isAuth: false
    });
  };

  componentDidMount() {
    if (this.state.session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
        this.state.session_id
        }`
      ).then(user => {
        this.updateAuth(user, this.state.session_id);
      });
    }
  }

  render() {
    const { user, session_id, isAuth } = this.state;
    return isAuth || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            onLogOut: this.onLogOut,
            updateAuth: this.updateAuth
          }}
        >
          <div>
            <Header user={user} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/account/favorites" component={AccountFavorites} />
            {/*
              "/" - MoviesPage
              "/movie/1" - Movie with id = 1
            */}
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
        <p>...Loading</p>
      );
  }
}
