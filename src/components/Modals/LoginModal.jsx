import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "../Header/Login/LoginForm";
import {withAuth} from "../../hoc/withAuth";

class LoginModal extends React.Component {
  render() {
    const {auth, authActions} = this.props;

    return (
      <Modal
        isOpen={auth.showLoginModal}
        toggle={authActions.toggleModal}
      >
        <ModalBody>
          <LoginForm/>
        </ModalBody>
      </Modal>
    )
  }
}

export default withAuth(LoginModal);
