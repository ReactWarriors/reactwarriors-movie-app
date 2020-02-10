import React from "react";
import Header from "./Header/Header";
import LoginModal from "./Modals/LoginModal";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import {BrowserRouter as Router} from "react-router-dom";
import {Route} from "react-router";
import {withAuth} from "../hoc/withAuth";

class App extends React.Component {

  componentDidMount() {
    const {auth, authActions} = this.props;

    if (auth.session_id) {
      authActions.fetchAuth(auth.session_id);
    }
  }

  render() {
    const {auth} = this.props;

    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={MoviesPage}/>
          <Route path="/movie/:id" component={MoviePage}/>
          {
            auth.showLoginModal && <LoginModal/>
          }
        </div>
      </Router>
    );
  }
}

export default withAuth(App);
