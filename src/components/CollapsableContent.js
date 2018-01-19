import React, {Component} from 'react';

class CollapsableContent extends Component {
    static BASE_Z_INDEX = 1000;
    ZIndex;

    constructor(props) {
        super(props);
        CollapsableContent.BASE_Z_INDEX--;
        this.ZIndex = CollapsableContent.BASE_Z_INDEX;

        this.state = {
            visible: false
        };
    }

    toggleShow() {
        this.setState({...this.state, visible: !this.state.visible})
    }

    hide(){
        this.setState({...this.state, visible: false})
    }

    render() {
        let containerStyle = {
            position: 'absolute',
            right: 0,
            left: 0,
            margin: '0 auto',
            maxWidth: '60%',
            minWidth: '20%',
            backgroundColor: '#eee',
            zIndex: this.ZIndex,
            padding: 5,
            display: this.state.visible ? 'block' : 'none'
        };

        let itemStyle = {color: '#999', cursor: 'pointer'};

        return (
            <div onClick={this.toggleShow.bind(this)} onMouseLeave={this.hide.bind(this)}>
                <small style={itemStyle}>click expand...</small>
                <div style={containerStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default CollapsableContent;
