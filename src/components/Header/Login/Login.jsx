import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import { AppContext } from "../../App";

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
        <AppContext.Consumer>
          {context => {
            //console.log("context", context);

            return (
              <div>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={context.toggleShowLogin}
                >
                  Login
                </button>

                <Modal
                  isOpen={context.showLogin}
                  toggle={context.toggleShowLogin}
                  {...this.props}
                >
                  <ModalBody>
                    <LoginForm />
                  </ModalBody>
                </Modal>
              </div>
            );
          }}
        </AppContext.Consumer>
      </div>
    );
  }
}
