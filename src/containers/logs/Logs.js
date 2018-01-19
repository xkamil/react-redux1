import React, {Component} from 'react';
import {clearLogs, fetchLogs} from "../../actions/logsActions";
import {connect} from "react-redux";
import SmartTable from "../../components/SmartTable";

class Logs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            logs: []
        }
    }

    componentDidMount() {
        this.props.fetch().then(() => {
            this.setState({...this.state, logs: this.props.logs.logs || []})
        });
    }

    parseLogs(rawLogs) {
        let parsedLogs = [];

        if (rawLogs instanceof Array) {
            let fullLog;

            rawLogs.forEach(log => {
                if (log.type === 'REQUEST') {
                    fullLog = {};
                    fullLog.method = log.method;
                    fullLog.path = log.url;
                    fullLog.time = log.time;
                    fullLog.requestHeaders = log.headers;

                    if (['POST', 'PUT', 'PATCH'].indexOf(log.method) > -1) {
                        fullLog.requestData = log.body;
                    }
                } else if (log.type = 'RESPONSE') {
                    fullLog.code = log.code;
                    fullLog.responseHeaders = log.headers;
                    fullLog.responseData = log.body
                    
                    parsedLogs.push(fullLog);
                }
            })
        }

        return parsedLogs;
    }

    render() {
        const {logs} = this.state;

        const parsedLogs = this.parseLogs(logs);
        

        return (
            <div>
                <h1>Logs</h1>
                <hr/>
                <SmartTable data={parsedLogs}/>
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
