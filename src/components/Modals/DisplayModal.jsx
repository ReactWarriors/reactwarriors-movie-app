import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "../Header/Login/LoginForm";
import AppContextHOC from "../HOC/AppContextHOC";

class DisplayModal extends React.Component {
  render() {
    const {showLoginModal, toggleModal} = this.props;

    return (
      <Modal
        isOpen={showLoginModal}
        toggle={toggleModal}
      >
        <ModalBody>
          <LoginForm/>
        </ModalBody>
      </Modal>
    )
  }
}

export default AppContextHOC(DisplayModal);
