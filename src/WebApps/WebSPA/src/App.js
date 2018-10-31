import React from "react";
import './App.css';

import Navigation from "./components/navigation/Navigation";
import AppRoutes from "./routing/AppRoutes";
import { getStorageValue } from "./services/storageService";


class App extends React.Component {
    constructor(props) {
        super();
    }
    
    render() {
        const token = getStorageValue("authentication");
        let isAuthenticated = false;
        if (token !== null) {
            isAuthenticated = true;
        }

        return (
            <div className="App">
                <Navigation isAuthenticated={isAuthenticated} token={token} />
                <AppRoutes isAuthenticated={isAuthenticated} />
            </div>
        );
    }
}

export default App;
