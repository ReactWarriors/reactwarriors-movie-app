import React from "react";
import Login from "./Login/Login";
import UserMenu from "./Login/UserMenu";

class Header extends React.Component {

  render() {
    const {user} = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home</a>
            </li>
          </ul>
          {
            user
              ? <UserMenu/>
              : <Login/>
          }

        </div>
      </nav>
    );
  }
}

export default Header;
