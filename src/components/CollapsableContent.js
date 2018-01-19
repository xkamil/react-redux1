import React, {Component} from 'react';

class CollapsableContent extends Component {

    static baseZIndex = 1000;
    ZIndex;

    constructor(props) {
        super(props);
        CollapsableContent.baseZIndex--;
        this.ZIndex = CollapsableContent.baseZIndex;

        this.state = {
            visible: false
        }
    }

    show() {
        this.setState({visible: true})
    }

    hide() {
        this.setState({visible: false})
    }

    render() {
        let containerStyle = {
            position: 'absolute',
            backgroundColor: this.state.visible ? '#eee' : '#fff',
            zIndex: this.ZIndex,
            padding: 5
        };

        let itemStyle = {color: '#999', cursor: 'pointer'};

        return (
            <div onMouseEnter={this.show.bind(this)} onMouseLeave={this.hide.bind(this)} style={containerStyle}>
                {this.state.visible && this.props.children}
                {!this.state.visible && <small style={itemStyle}>hover expand...</small>}
            </div>
        );
    }
}

export default CollapsableContent;
