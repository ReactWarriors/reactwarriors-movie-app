import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Login from "./Login/Login";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import {
  updateAuth,
  onLogOut,
  toggleLoginModal,
  updateFavoriteMovies
} from "../redux/auth/auth.actions";
import { connect } from "react-redux";

export const AppContext = React.createContext();

class App extends React.Component {
  getFavoriteMovies = ({ user, session_id }) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id
      }
    }).then(data => {
      this.props.updateFavoriteMovies(data.results);
    });
  };

  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      }).then(user => {
        this.props.updateAuth({ user, session_id });
        this.getFavoriteMovies({ user, session_id });
      });
    }
  }

  render() {
    const {
      user,
      session_id,
      updateAuth,
      onLogOut,
      showLoginModal,
      toggleLoginModal
    } = this.props;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            updateAuth,
            onLogOut,
            showLoginModal,
            toggleLoginModal
          }}
        >
          <div>
            <Header />
            {showLoginModal && <Login />}
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    showLoginModal: state.auth.showLoginModal
  };
};

const mapDispatchToProps = {
  updateAuth,
  onLogOut,
  toggleLoginModal,
  updateFavoriteMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
