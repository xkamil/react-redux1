import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchConfiguration, resetConfiguration, saveConfiguration} from "../../actions/configurationActions";
import {areEqual} from "../../utils/comparators";

class Configuration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            changed: false,
            configuration: {
                access_token_expiration_time: 0,
                refresh_token_expiration_time: 0,
                client_id: '',
                client_secret: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleResetToDefault = this.handleResetToDefault.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        this.props.fetch();
    }

    componentWillReceiveProps(nextProps) {
        let newConfiguration = nextProps.configuration.configuration;
        if (!areEqual(this.state.configuration, newConfiguration)) {
            this.setState({...this.state, changed: false, configuration: {...newConfiguration}})
        }else if(this.state.changed){
            this.setState({...this.state, changed: false})
        }
    }

    handleChange(e) {
        let id = e.target.getAttribute('id');
        let type = e.target.type;
        let value = type === 'number' ? parseInt(e.target.value) : e.target.value;
        let configuration = {...this.state.configuration, [id]: value};
        let changed = !areEqual(configuration, this.props.configuration.configuration);

        this.setState({...this.state, changed, configuration});
    }

    handleSave() {
        this.props.save(this.state.configuration);
    }

    handleCancel() {
        this.setState({...this.state, changed: false, configuration: {...this.props.configuration.configuration}})
    }

    handleResetToDefault() {
        this.props.reset();
    }

    render() {
        const {configuration} = this.props.configuration;

        return (
            <div>
                <h1>Configuration</h1>
                <hr/>
                <pre>
                    {JSON.stringify(configuration, null, 3)}
                </pre>

                <form>
                    <div className="form-group">
                        <label htmlFor="access_token_expiration_time">Access token expiration time:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="access_token_expiration_time"
                            value={this.state.configuration.access_token_expiration_time}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="refresh_token_expiration_time">Refresh token expiration time:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="refresh_token_expiration_time"
                            value={this.state.configuration.refresh_token_expiration_time}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="client_id">Client ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="client_id"
                            value={this.state.configuration.client_id}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="client_secret">Client secret:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="client_secret"
                            value={this.state.configuration.client_secret}
                            onChange={this.handleChange}/>
                    </div>
                    <div className="btn-group">
                        {this.state.changed && <span className="btn btn-success" onClick={this.handleSave}>Save</span>}
                        {this.state.changed &&
                        <span className="btn btn-danger" onClick={this.handleCancel}>Cancel</span>}
                        <span className="btn btn-primary" onClick={this.handleResetToDefault}>Reset to default</span>
                    </div>
                </form>
                <hr/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {configuration: state.configuration}
};

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(fetchConfiguration()),
    reset: () => dispatch(resetConfiguration()),
    save: (configuration) => dispatch(saveConfiguration(configuration))
});

Configuration = connect(mapStateToProps, mapDispatchToProps)(Configuration);

export default Configuration;
