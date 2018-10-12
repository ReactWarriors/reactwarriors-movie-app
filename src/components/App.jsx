import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Cookies from "universal-cookie";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut
} from "../actions/actions";

const cookies = new Cookies();

export const AppContext = React.createContext();
export default class App extends React.Component {
  updateAuth = (user, session_id) => {
    this.props.store.dispatch(
      actionCreatorUpdateAuth({
        user,
        session_id
      })
    );
  };

  onLogOut = () => {
    this.props.store.dispatch(actionCreatorLogOut());
  };

  componentDidMount() {
    const { store } = this.props;
    const { session_id } = store.getState();
    store.subscribe(() => {
      console.log("change", store.getState());
      this.forceUpdate();
    });
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      }).then(user => {
        this.updateAuth(user, session_id);
      });
    }
  }

  render() {
    const { user, session_id, isAuth } = this.props.store.getState();
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
