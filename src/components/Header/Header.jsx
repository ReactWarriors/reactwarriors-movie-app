import React from "react";
import Login from "./Login/Login";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link">Home</a>
            </li>
          </ul>
          <Login />
        </div>
      </nav>
    );
  }
}

export default Header;
