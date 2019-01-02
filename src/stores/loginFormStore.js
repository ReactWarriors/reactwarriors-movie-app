import { observable, action } from "mobx";

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
    this.errors.base = null;
    this.errors[name] = null;
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
}

export const loginFormStore = new LoginFormStore();
