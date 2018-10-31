import React from "react";

import GlobalConstants from "../../utils/globalConstants";
import { get } from "../../services/requestService";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ""
        };

        this._getUserData = this._getUserData.bind(this);
    }

    _getUserData(token) {
        const headers = {
            Authorization: `Bearer ${token}`
        };
        get(GlobalConstants.USER_DATA_URL, headers)
        .then(res => res.json())
        .then(res => {
            this.setState({
                email: res.name
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this._getUserData(this.props.token);
        }
    }

    componentWillReceiveProps(props) {
        this._getUserData(props.token);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                        aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>

                        <a className="navbar-brand" href="/start-game">Tensor Snake</a>
                    </div>
                    {this.props.isAuthenticated
                    ? <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.email}
                                <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    : null}
                </div>
            </nav>
        );
    }
}

export default Navigation;
