import React from "react";
import Login from "./Login/Login";
import UserMenu from "./Login/UserMenu";
import {Route, Link} from "react-router-dom";

class Header extends React.Component {

  render() {
    const {user} = this.props;

    return (
      <Route>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            </ul>
            {
              user
                ? <UserMenu/>
                : <Login/>
            }
          </div>
        </nav>
      </Route>
    );
  }
}

export default Header;
