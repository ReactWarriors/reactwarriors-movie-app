import React from "react";
import classNames from "classnames";
import {API_URL, API_KEY_3, fetchApi} from "../../../api/api";

export default class LoginForm extends React.Component {

  state = {
    username: "",
    password: "",
    repeatpassword: "",
    errors: {},
    submitting: false
  };

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }));
  };

  handleBlur = event => {
    const {name} = event.target;
    const errors = this.validateFields(name);

    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  validateFields = name => {
    const errors = {};

    switch (name) {
      case "username":
        if (this.state.username === "") {
          errors.username = "Not empty";
        }
        break;
      case "password":
        if (this.state.password.length < 5) {
          errors.password = 'Required! Must be 5 characters or more';
        }
        break;
      case "repeatpassword":
        if (this.state.repeatpassword !== this.state.password) {
          errors.repeatpassword = "Must be equal password"
        }
        break;
    }
    return errors;
  };

  onSubmit = () => {

    this.setState({
      submitting: true
    });
    fetchApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return fetchApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return fetchApi(
          `${API_URL}/account?api_key=${API_KEY_3}&session_id=${
            data.session_id
          }`
        );
      })
      .then(user => {
        this.props.updateUser(user);
        this.setState({
          submitting: false
        });
      })
      .catch(error => {
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  onLogin = e => {
    e.preventDefault();

    const errors = this.validateFields();

    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.onSubmit();
    }
  };


  render() {
    const {username, password, repeatpassword, errors, submitting} = this.state;

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
              className={classNames('form-control', {'is-invalid': errors.username})}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className={classNames('form-control', {'is-invalid': errors.password})}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Повторите пароль</label>
            <input
              type="password"
              className={classNames('form-control', {'is-invalid': errors.repeatpassword})}
              id="repeatpassword"
              placeholder="Повторите пароль"
              name="repeatpassword"
              value={repeatpassword}
              onChange={this.onChange}
              onBlur={this.handleBlur}
            />
            {errors.repeatpassword && (
              <div className="invalid-feedback">{errors.repeatpassword}</div>
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
};
