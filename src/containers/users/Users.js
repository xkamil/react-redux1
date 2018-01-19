import React, {Component} from 'react';
import {fetchUsers} from "../../actions/userActions";
import {connect} from "react-redux";
import SmartTable from "../../components/SmartTable";

class Users extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    getUsersList() {
        let users = this.props.users.list || {};
        return Object.getOwnPropertyNames(users).map(id => ({id, ...users[id]}));
    }

    render() {
        return (
            <div>
                <h1>List of users</h1>
                <SmartTable data={this.getUsersList()}/>
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers())
});

Users = connect(mapStateToProps, mapDispatchToProps)(Users);

export default Users;
