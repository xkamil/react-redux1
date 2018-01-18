import React, {Component} from 'react';
import {fetchUsers} from "../../actions/userActions";
import {connect} from "react-redux";
import CollapsableContent from "./CollapsableContent";

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    getUsersList() {
        let users = this.props.users.list || {};
        let usersArr = [];

        Object.getOwnPropertyNames(users).forEach(id => {
            usersArr.push({id, ...users[id]})
        });

        return usersArr;
    }

    render() {
        return (
            <div>
                <h1>List of users</h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>password</th>
                        <th>email</th>
                        <th>scopes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getUsersList().map((user, idx) => (
                        <tr key={idx} id={`table-row-${idx}`}>
                            <td style={{width: '15%'}}>{user.id}</td>
                            <td style={{width: '15%'}}>{user.password}</td>
                            <td style={{width: '15%'}}>{user.scopes.email.email}</td>
                            <td><CollapsableContent><pre>{JSON.stringify(user.scopes, null, 2).replace(/({)|(})|(")|(,)/g,'')}</pre></CollapsableContent></td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {users: state.users}
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
};

Users = connect(mapStateToProps, mapDispatchToProps)(Users);

export default Users;
