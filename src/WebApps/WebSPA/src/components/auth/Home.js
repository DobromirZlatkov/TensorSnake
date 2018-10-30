import React from "react";
import { Link } from "react-router-dom";

const jumbotronStyles = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center"
}

class Home extends React.Component {
    render() {
        return (
            <div className="jumbotron" style={jumbotronStyles}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <Link style={{marginRight: "10px"}} className="btn btn-default" to={"/login"}>Log in</Link>
                            <Link className="btn btn-primary" to={"/register"}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
