import React from "react";
import classNames from "classnames";
import AppContextHOC from "../../HOC/AppContextHOC";
import { inject, observer } from "mobx-react";

@AppContextHOC
@inject(({ loginFormStore }) => ({
  loginFormStore
}))
@observer
class LoginForm extends React.Component {
  onLogin = e => {
    e.preventDefault();
    const errors = this.props.loginFormStore.validateFields();
    if (Object.keys(errors).length > 0) {
      // this.setState(prevState => ({
      //   errors: {
      //     ...prevState.errors,
      //     ...errors
      //   }
      // }));
      this.props.loginFormStore.updateErrors(errors);
    } else {
      // const callback = ({ user, session_id }) => {
      //   this.props.updateAuth({ user, session_id });
      //   // this.props.toggleLoginForm
      // };
      this.props.loginFormStore.onSubmit().then(data => {
        console.log(data);
        // this.props.updateAuth({ user, session_id });
      });
    }
  };

  getClassForInput = key =>
    classNames("form-control", {
      invalid: this.props.loginFormStore.errors[key]
    });

  render() {
    const {
      loginFormStore: {
        username,
        password,
        errors,
        submitting,
        onChange,
        onBlur
      }
    } = this.props;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className={this.getClassForInput("username")}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className={this.getClassForInput("password")}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={onChange}
              onBlur={onBlur}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

export default LoginForm;
