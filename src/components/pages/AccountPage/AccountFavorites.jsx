import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import CallApi from "../../../api/api";
import { connect } from "react-redux";

class AccountFavorites extends Component {
  render() {
    return this.props.isAuth ? (
      <div className="container">Account Favorites</div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.authentification.isAuth
  };
};

export default connect(mapStateToProps)(AccountFavorites);
