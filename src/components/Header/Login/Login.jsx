import React from "react";
import {withAuth} from "../../../hoc/withAuth";

class Login extends React.Component {
  render() {
    const {authActions} = this.props;

    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={authActions.toggleModal}
        >
          Login
        </button>
      </div>
    );
  }
}

export default withAuth(Login);
