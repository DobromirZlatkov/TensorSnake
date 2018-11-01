import React from "react";
import { connect } from "react-redux";

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>

            <a className="navbar-brand" href="/">
              Tensor Snake
            </a>
          </div>
          {this.props.isAuthenticated ? (
            <div
              className="collapse navbar-collapse"
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.props.user.userName}
                    <span className="caret" />
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated
  };
}

export default connect(
  mapStateToProps,
  null
)(Navigation);
