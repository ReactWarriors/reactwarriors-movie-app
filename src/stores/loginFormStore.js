import { observable, action, configure } from "mobx";
import CallApi from "../api/api";
import { userStore } from "./userStore";

configure({ enforceActions: "always" });

class LoginFormStore {
  @observable username = "evgeniypodgaetskiy";

  @observable password = "temp1992";

  @observable errors = {};

  @observable submitting = false;

  @action
  onChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this[name] = value;
    // this.errors.base = null;
    // this.errors[name] = null;
    this.updateErrors({
      base: null,
      [name]: null
    });
  };

  @action
  updateSubmitting = value => {
    this.submitting = value;
  };

  @action
  updateErrors = (errors = {}) => {
    for (let key in errors) {
      this.errors[key] = errors[key];
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.username === "") {
      errors.username = "Not empty";
    }

    return errors;
  };

  @action
  onBlur = event => {
    const errors = this.validateFields();
    const name = event.target.name;
    if (errors[name]) this.errors[name] = errors[name];
  };

  @action
  onSubmit = () => {
    this.updateSubmitting(true);
    let session_id = null;
    return CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.username,
            password: this.password,
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        session_id = data.session_id;
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        this.updateSubmitting(false);
        userStore.updateAuth({
          user,
          session_id
        });
        // callback({ user, session_id });
      })
      .catch(error => {
        this.updateSubmitting(false);
        this.updateErrors({
          base: error.status_message
        });
      });
  };
}

export const loginFormStore = new LoginFormStore();
