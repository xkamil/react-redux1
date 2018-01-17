import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Users from "./containers/Users";
import MainMenu from "./components/MainMenu";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <MainMenu/>
                    <Route exact path="/users" component={Users}/>
                </div>
            </Router>
        );
    }
}

export default App;
