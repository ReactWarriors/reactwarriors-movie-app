import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          type="button"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm
              updateUser={this.props.updateUser}
              updateSessionId={this.props.updateSessionId}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
