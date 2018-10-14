import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut
} from "../actions/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export const AppContext = React.createContext();

class App extends React.Component {
  componentDidMount() {
    const { session_id } = this.props;
    if (session_id) {
      CallApi.get("/account", {
        params: {
          session_id
        }
      }).then(user => {
        this.props.updateAuth({ user, session_id });
      });
    }
  }

  render() {
    const { user, session_id, isAuth, updateAuth, onLogOut } = this.props;
    return isAuth || !session_id ? (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            isAuth,
            updateAuth,
            onLogOut
          }}
        >
          <div>
            <Header user={user} />
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:id" component={MoviePage} />
            <Route path="/account/favorites" component={AccountFavorites} />
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    ) : (
      <p>...Loading</p>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentification.user,
    session_id: state.authentification.session_id,
    isAuth: state.authentification.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAuth: actionCreatorUpdateAuth,
      onLogOut: actionCreatorLogOut
    },
    dispatch
  );
  // {
  //   updateAuth: bindActionCreators(actionCreatorUpdateAuth, dispatch),
  //   onLogOut: bindActionCreators(actionCreatorLogOut, dispatch)
  // };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
