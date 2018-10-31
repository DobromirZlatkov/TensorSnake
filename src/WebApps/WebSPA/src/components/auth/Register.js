import React from "react";

import AuthService from "../../services/authService";

const jumbotronStyles = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center"
};

class Register extends React.Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      password: "",
      errors: {}
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.handleFormValidation = this.handleFormValidation.bind(this);
    this.authService = new AuthService();
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  isEmailValid(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleFormValidation() {
    let formIsValid = true;

    let errors = {};

    const username = this.state.username;
    if (!username) {
      errors.username = "Please enter an email";
      formIsValid = false;
    }

    if (!errors.username && !this.isEmailValid(username)) {
      errors.username = "Please enter a valid email";
      formIsValid = false;
    }

    const password = this.state.password;
    if (!password || password.length < 6) {
      errors.password = "Password is too short";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  onRegister(e) {
    e.preventDefault();

    let isFormValid = this.handleFormValidation();
    if (isFormValid) {
      // Process register if form is valid
    }
  }

  render() {
    return (
      <div className="jumbotron" style={jumbotronStyles}>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <form
                className="mp-form-submit"
                data-evt-title="Register Submit"
                method="POST"
                action=""
              >
                {this.state.errors.username && (
                  <div className="text-danger">
                    {this.state.errors.username}
                  </div>
                )}
                <input
                  type="text"
                  onChange={this.onUsernameChange}
                  id="user-email"
                  className="form-control"
                  placeholder="E-mail address"
                  value={this.state.username}
                />

                <br />
                {this.state.errors.password && (
                  <div className="text-danger">
                    {this.state.errors.password}
                  </div>
                )}
                <input
                  type="password"
                  onChange={this.onPasswordChange}
                  id="user-password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.password}
                />

                <br />
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={this.onRegister}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
