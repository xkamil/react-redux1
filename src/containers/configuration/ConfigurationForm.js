import React, {Component} from 'react';


class ConfigurationForm extends Component {

    render() {
        const {configuration, changed, handleChange, handleSave, handleCancel, handleResetToDefault} = this.props;

        return (
            <form>
                <div className="form-group">
                    <label htmlFor="access_token_expiration_time">Access token expiration time:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="access_token_expiration_time"
                        value={configuration.access_token_expiration_time}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="refresh_token_expiration_time">Refresh token expiration time:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="refresh_token_expiration_time"
                        value={configuration.refresh_token_expiration_time}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="client_id">Client ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="client_id"
                        value={configuration.client_id}
                        onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="client_secret">Client secret:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="client_secret"
                        value={configuration.client_secret}
                        onChange={handleChange}/>
                </div>
                <div className="btn-group">
                    {changed && <span className="btn btn-success" onClick={handleSave}>Save</span>}
                    {changed && <span className="btn btn-danger" onClick={handleCancel}>Cancel</span>}
                    <span className="btn btn-primary" onClick={handleResetToDefault}>Reset to default</span>
                </div>
            </form>
        );
    }
}

export default ConfigurationForm;
