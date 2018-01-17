import React, {Component} from 'react';
import {fetchUsers} from "../actions/userActions";
import {connect} from "react-redux";

class Users extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const {users} = this.props;

        return (
            <div>
                <h1>List of users</h1>
                {JSON.stringify(users,null,3)}
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state:');
    console.log(state);
    return {users: state.users}
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => fetchUsers(dispatch)
    }
};

Users = connect(mapStateToProps, mapDispatchToProps)(Users);

export default Users;
