import React, { Component } from 'react';
import ClientOauth2 from 'client-oauth2';
import logo from './logo.svg';
import './App.css';


class App extends Component {

    componentDidMount() {
        console.log('fasdfasdfasfsda')
        var githubAuth = new ClientOauth2({
            clientId: 'spa',
            clientSecret: 'secret',//'K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=',
            accessTokenUri: 'http://localhost:3105/connect/token',
            authorizationUri: 'http://localhost:3105/connect/authorize',
            scopes: ["openid", "profile", "offline_access"]
        });

        githubAuth.owner.getToken('demouser@test.com', 'Pass@word1')
            .then(function (user) {
                console.log(user) //=> { accessToken: '...', tokenType: 'bearer', ... }
            })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                  </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                  </a>
                </header>
            </div>
        );
    }
}

export default App;
