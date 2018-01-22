import React, {Component} from 'react';
import {clearLogs, fetchLogs} from "../../actions/logsActions";
import {connect} from "react-redux";
import SmartTable from "../../components/SmartTable";

class Logs extends Component {

    componentDidMount() {
        this.props.fetch();
    }


    render() {
        const {logs} = this.props.logs || [];

        return (
            <div>
                <h1>Logs</h1>
                <hr/>
                <SmartTable data={logs}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    logs: state.logs
});

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(fetchLogs()),
    clear: () => dispatch(clearLogs()),
});

Logs = connect(mapStateToProps, mapDispatchToProps)(Logs);

export default Logs;
