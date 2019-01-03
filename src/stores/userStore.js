import { observable, computed, action, configure } from "mobx";

configure({ enforceActions: "always" });

class UserStore {
  @observable user = {};

  @observable session_id = null;

  @computed
  isAuth() {
    return Boolean(Object.keys(this.user).length);
  }

  @action
  updateAuth = ({ user, session_id }) => {};

  @action
  onLogOut = () => {};
}

export const userStore = new UserStore();
