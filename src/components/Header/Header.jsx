import React from "react";

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
        </div>
      </nav>
    );
  }
}

export default Header;
