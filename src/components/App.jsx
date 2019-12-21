import React from "react";
import Header from "./Header/Header";
import CallApi from "../api/api";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter, Route } from "react-router-dom";
import {
  actionCreatorUpdateAuth,
  actionCreatorLogOut
} from "../actions/actions";
import { connect } from "react-redux";

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
    const { user, session_id, updateAuth, onLogOut } = this.props;
    return (
      <BrowserRouter>
        <AppContext.Provider
          value={{
            user,
            session_id,
            updateAuth,
            onLogOut
          }}
        >
          <div>
            <Header user={user} />
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
    user: state.authReducer.user,
    session_id: state.authReducer.session_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAuth: ({ user, session_id }) =>
      dispatch(
        actionCreatorUpdateAuth({
          user,
          session_id
        })
      ),
    onLogOut: () => dispatch(actionCreatorLogOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
