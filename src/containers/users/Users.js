import React, {Component} from 'react';
import {fetchUsers} from "../../actions/userActions";
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
                <pre>{JSON.stringify(users.list, null, 3)}</pre>
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
