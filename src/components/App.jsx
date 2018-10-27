import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import AccountFavorites from "./pages/AccountPage/AccountFavorites";
import * as actionsAuthentication from "../actions/actionsAuthentication";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
    const { user, session_id, isAuth } = this.props;
    return isAuth || !session_id ? (
      <BrowserRouter>
        <React.Fragment>
          <Header user={user} />
          <Route exact path="/" component={MoviesPage} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route path="/account/favorites" component={AccountFavorites} />
        </React.Fragment>
      </BrowserRouter>
    ) : (
      <p>...Loading</p>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
    session_id: state.authentication.session_id,
    isAuth: state.authentication.isAuth
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateAuth: actionsAuthentication.actionCreatorUpdateAuth,
      onLogOut: actionsAuthentication.actionCreatorLogOut
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
