import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MainMenu extends Component {
    render() {
        return (
            <nav style={{float: 'right', marginTop: 5}}>
                <Link to="/users" className="btn btn-dark margined">Users</Link>
                <Link to="/configuration" className="btn btn-dark">Configuration</Link>
                <Link to="/tokens/access_tokens" className="btn btn-dark">Tokens</Link>
                <Link to="/logs" className="btn btn-dark">Logs</Link>
            </nav>
        );
    }
}

export default MainMenu;
