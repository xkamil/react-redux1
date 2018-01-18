import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MainMenu extends Component {
    render() {
        return (
            <nav>
                <Link to="/users" className="btn btn-dark">Users</Link>
                <Link to="/configuration" className="btn btn-dark">Configuration</Link>
                <Link to="/tokens" className="btn btn-dark">Tokens</Link>
                <Link to="/logs" className="btn btn-dark">Logs</Link>
            </nav>
        );
    }
}

export default MainMenu;
