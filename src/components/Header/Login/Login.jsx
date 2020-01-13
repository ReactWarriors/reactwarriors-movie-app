import React from "react";
import AppContextHOC from "../../HOC/AppContextHOC";

class Login extends React.Component {
  render() {
    const {toggleModal} = this.props;

    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleModal}
        >
          Login
        </button>
      </div>
    );
  }
}

export default AppContextHOC(Login);
