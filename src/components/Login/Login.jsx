import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppContextHOC from "../HOC/AppContextHOC";

class Login extends React.Component {
  render() {
    const { showLoginModal, toggleLoginModal } = this.props;
    return (
      <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
    );
  }
}

export default AppContextHOC(Login);
