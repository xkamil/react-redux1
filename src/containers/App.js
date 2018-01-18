import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Users from "../containers/Users";
import Configuration from "../containers/configuration/Configuration";
import MainMenu from "../components/MainMenu";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <MainMenu/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/configuration" component={Configuration}/>
                </div>
            </Router>
        );
    }
}

export default App;
