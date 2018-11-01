import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";

import * as loadingActions from "../../actions/loadingActions";
import * as userActions from "../../actions/userActions";
import * as authActions from "../../actions/authActions";

import AuthService from "../../services/authService";
import GlobalConstants from "../../utils/globalConstants";
import { setStorageValue } from "../../services/storageService";
import { authorizedFetch } from "../../services/requestService";

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
      confirmPassword: "",
      errors: {}
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
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

  onConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
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

    const confirmPassword = this.state.confirmPassword;
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords don't match";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  onRegister(e) {
    e.preventDefault();

    let isFormValid = this.handleFormValidation();
    if (isFormValid) {
        let body = {
            email: this.state.username,
            password: this.state.password,
            confirmpassword: this.state.password
        };
      this.props.loadingActions.setLoading(true);

      authorizedFetch(GlobalConstants.REGISTER_URL, "POST", body)
        .then(res => {
          this.props.loadingActions.setLoading(false);
          if (res.status === 400) {
            let errors = { ...this.state.errors };
            errors.username = "User with that email already exists";
            this.setState({ errors });
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        })
        .then(() => {
          let authService = new AuthService();
          return authService.getAccessToken(
            this.state.username,
            this.state.password
          );
        })
        .then(res => {
          setStorageValue("authentication", res.accessToken);
          this.props.authActions.setIsAuthenticated(true);
          return authorizedFetch(GlobalConstants.USER_DATA_URL, "GET");
        })
        .then(res => res.json())
        .then(res => {
          let userData = {
            userId: res.sub,
            userName: res.name
          };
          return this.props.userActions.setUser(userData);
        })
        .then(() => {
          this.context.router.history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
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
                {this.state.errors.confirmPassword && (
                  <div className="text-danger">
                    {this.state.errors.confirmPassword}
                  </div>
                )}
                <input
                  type="password"
                  onChange={this.onConfirmPasswordChange}
                  id="confirm-password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
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

Register.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    loadingActions: bindActionCreators(loadingActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Register)
);
