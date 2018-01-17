import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MainMenu extends Component {
    render() {
        return (
            <nav>
                <Link to="/users">Users</Link>
            </nav>
        );
    }
}

export default MainMenu;
