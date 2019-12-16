import React, { Component } from "react";
import AppContextHOC from "../../HOC/AppContextHOC";
import { Redirect } from "react-router-dom";

class AccountFavorites extends Component {
  render() {
    return this.props.isAuth ? (
      <div className="container">Account Favorites</div>
    ) : (
        <Redirect to="/" />
      );
  }
}

export default AppContextHOC(AccountFavorites);
