import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Users from "../containers/users/Users";
import Configuration from "../containers/configuration/Configuration";
import MainMenu from "../components/MainMenu";
import Tokens from "./tokens/Tokens";
import Logs from "./logs/Logs";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <MainMenu/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/configuration" component={Configuration}/>
                    <Route exact path="/tokens" component={Tokens}/>
                    <Route exact path="/logs" component={Logs}/>
                </div>
            </Router>
        );
    }
}

export default App;
