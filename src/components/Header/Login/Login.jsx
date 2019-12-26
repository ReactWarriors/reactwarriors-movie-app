import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppContextHOC from "../../HOC/AppContextHOC";


class Login extends React.Component {
  render() {
    const {showModal, toggleModal} = this.props;

    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={toggleModal}
        >
          Login
        </button>
        <Modal
          isOpen={showModal}
          toggle={toggleModal}
        >
          <ModalBody>
            <LoginForm/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AppContextHOC(Login);
